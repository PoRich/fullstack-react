import { Optional } from "./types"

// Helper function to determine if our browser supports AudioContext
export function accessContext(): Optional<AudioContextType>{
    return window.AudioContext || window.webkitAudioContext || null 
}