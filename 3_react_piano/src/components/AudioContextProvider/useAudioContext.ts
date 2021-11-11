import { useRef } from "react"
import { Optional } from "../../domain/types"
import { accessContext } from "../../domain/audio"

export function useAudioContext(): Optional<AudioContextType>{
    const AudoiCtx = useRef(accessContext())
    return AudoiCtx.current
}