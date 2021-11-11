/// <reference types="react-scripts" />

type SoundfontType = typeof Soundfont 
// AudioContext used as a constructor function
type AudioContextType = typeof AudioContext 

// In some browsers AudoContext is accessible via AudioContext property 
// and in others its accessible via webkitAudioContext
interface Window extends Window {
    webkitAudioContext: AudioContextType
}

