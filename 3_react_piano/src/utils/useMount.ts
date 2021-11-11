import { EffectCallback, useEffect } from "react";


const useEffectOnce = (effect: EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []) // empty array signifies to run effect once upon mounting
}

// don't use global Function type because it accepts any function-like value 
// including class declarations that can throw an error if called incorrectly
type Effect = (...args: unknown[]) => void

export const useMount = (fn: Effect) => {
    useEffectOnce(() => {
        fn()
    })
}