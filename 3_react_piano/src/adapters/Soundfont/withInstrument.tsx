import { Component, ComponentType, Provider } from "react" 
import Soundfont, { instrument, InstrumentName, Player } from "soundfont-player"
import { MidiValue } from "../../domain/note"
import { Optional } from "../../domain/types"
import { AudioNodesRegistry, DEFAULT_INSTRUMENT } from "../../domain/sound"

// aka ProvidedProps in the Render Props Version 
type InjectedProps = {
    loading: boolean 
    play(note: MidiValue): Promise<void>
    stop(note: MidiValue): Promise<void>
}

type ProviderProps = {
    instrument: InstrumentName
    AudioContext: AudioContextType 
}

type ProviderState = {
    loading: boolean
    current: Optional<InstrumentName>
}

// Higher Order Component
// Tell the type checker which props we're going to inject
// 'Extends' allows flexibility to pass additional props not defined in InjectedProps
export function withInstrument<
    TProps extends InjectedProps = InjectedProps
        >(WrappedComponent: ComponentType<TProps>){
    // displayName will be useful in debugging 
    const displayName = 
        WrappedComponent.displayName || WrappedComponent.name || "Component"

    return class WithInstrument extends Component<ProviderProps, ProviderState> {
        public static defaultProps = { instrument: DEFAULT_INSTRUMENT }
        public static dislpayName = `withInstrument(${displayName})`

        private audio: AudioContext 
        private player: Optional<Player> = null 
        private activeNodes: AudioNodesRegistry = {}

        public state: ProviderState = {
            loading: false, 
            current: null
        }

        private resume = async () => {
            return this.audio.state === "suspended"
                ? await this.audio.resume()
                : Promise.resolve()
        }

        constructor(props: ProviderProps){
            super(props)

            const { AudioContext } = this.props 
            this.audio = new AudioContext()
        }

        public componentDidMount() {
            const { instrument } = this.props 
            this.load(instrument)
        }

        public shouldComponentUpdate({ instrument }: ProviderProps){
            return this.state.current !== instrument 
        }

        public componentDidUpdate({
            instrument: prevInstrument
        }: ProviderProps) {
            const { instrument } = this.props 
            if (instrument && instrument !== prevInstrument) {
                this.load(instrument)
            }
        }

        private load = async (instrument: InstrumentName) => {
            this.setState({ loading: true})

            this.player = await Soundfont.instrument(this.audio, instrument)
            this.setState({loading: false, current: instrument })
        }

        public play = async (note: MidiValue) => {
            await this.resume()
            if (!this.player) return

            const node = this.player.play(note.toString())
            this.activeNodes = { ...this.activeNodes, [note]:node }
        }

        public stop = async (note: MidiValue) => {
            await this.resume()
            if (!this.activeNodes[note]) return 

            this.activeNodes[note]!.stop()
            this.activeNodes = { ...this.activeNodes, [note]: null }
        }

        public render(){
            const injected = {
                loading: this.state.loading, 
                play: this.play, 
                stop: this.stop 
            } as InjectedProps

            return <WrappedComponent {...(injected as TProps)} />
        }
    }
}