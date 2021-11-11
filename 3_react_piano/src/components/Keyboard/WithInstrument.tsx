import { useEffect } from "react";
import { Keyboard } from "."
import { useAudioContext } from "../AudioContextProvider";
import { useInstrument } from "../../state/Instrument/Context";
import { useSoundFont } from "../../adapters/Soundfont/useSoundfont";  // hook
// import { SoundfontProvider } from "../../adapters/Soundfont/SoundfontProvider";  // Render Props
// import { withInstrument } from "../../adapters/Soundfont/withInstrument";  // HOC



// Version 1: with useSoundFont Hook
export const KeyboardWithInstrument =  () => {
    // Get access browswer audio context 
    // Confident AudioContext is not null because this was tested already in the  Main comopnent
    const AudioContext = useAudioContext()!
    const { instrument } = useInstrument() 
    
    // Custom hook to get API methods via adaptor
    const { loading, current, play, stop, load } = useSoundFont({
        AudioContext
    })
    
    // Load instrument if a new one is selected
    useEffect(() => {
        if (!loading && instrument !== current) {
            load(instrument)
        }
    }, [load, loading, current, instrument])
    
    return <Keyboard loading={loading} play={play} stop={stop} />
}


/* 
// Version 2: Render Props Verison with SoundfontProvider Functional Component
export const KeyboardWithInstrument =  () => {
    // Get access browswer audio context 
    // Confident AudioContext is not null because this was tested already in the  Main comopnent
    const AudioContext = useAudioContext()!
    const { instrument } = useInstrument() 
    
    return (<SoundfontProvider 
            AudioContext={AudioContext}
            instrument={instrument}
            render={(props) => <Keyboard {...props}/> }
            />)
}


// Version 3: Higher Order Component 
// Component that uses components as inputs / outputs
const WrappedKeyboard = withInstrument(Keyboard)

export const KeyboardWithInstrument = () => {
    const AudioContext = useAudioContext()!
    const { instrument } = useInstrument() 

    return (
        <WrappedKeyboard 
            AudioContext={AudioContext}
            instrument={instrument}/>
    )
}

*/
