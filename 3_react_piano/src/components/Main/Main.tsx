import { Playground } from "../Playground/Playground"
import { NoAudioMessage } from "../NoAudioMessage"
import { useAudioContext } from "../AudioContextProvider"

export const Main = () => {
    const AudioContext = useAudioContext()
    // double negation!! converts it to boolean value
    return !!AudioContext ? <Playground /> : <NoAudioMessage />
}