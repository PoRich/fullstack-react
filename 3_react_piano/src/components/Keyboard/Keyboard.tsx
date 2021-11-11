import { FunctionComponent } from "react"
import { Key } from "../Key"
import { notes, MidiValue } from "../../domain/note"
import { selectKey } from "../../domain/keyboard"
import styles from "./Keyboard.module.css"


export type KeyboardProps = { 
    loading: boolean 
    play: (note: MidiValue) => Promise<void>  // async function that doesn't return anything
    stop: (note: MidiValue) => Promise<void>  // async function that doesn't return anything
}

export const Keyboard: FunctionComponent<KeyboardProps> = ({loading, stop, play}) =>{
    return (
        <div className={styles.keyboard}>
            {notes.map(({midi, type, index, octave }) => {
                const label = selectKey(octave, index)
                return (
                    <Key 
                        key={midi} 
                        type={type} 
                        label={label} 
                        disabled={loading} 
                        onDown={()=>play(midi)} 
                        onUp={()=>stop(midi)} 
                        />)
            })}
        </div>
    )
}
