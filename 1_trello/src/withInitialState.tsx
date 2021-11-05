import { ComponentType, useEffect, useState } from "react";
import { AppState } from "./state/AppStateReducer";
import { load } from "./api";


// Define type that will represent the props that we are injecting 
type InjectedProps = {
    initialState: AppState
}

// TBaseProps represents original props type of the wrapped component 
// Omit removes the fields of the InjectedProps
type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>

// Higher Order Component (HOC)
export function withInitialState<TProps>(  // TProps can be any type
    WrappedComponent: ComponentType<
        // reconstruct the original TProps by removing the InjectedProps (from initial state)
        // and creating a new type as an intersection with InjectedProps (from server)
        PropsWithoutInjected<TProps> & InjectedProps  
        >){ 
        return (props: PropsWithoutInjected<TProps>) =>{
            const [initialState, setInitialState] = useState<AppState>({
                lists: [],
                draggedItem: null
                });
            const [ isLoading, setIsLoading ] = useState(true);
            const [ error, setError ] = useState<Error | undefined>()

            // useEffect is triggered once we mount our component 
            useEffect(() => {
                // async/await syntax in useEffect needs to be in a function
                const fetchInitialState = async () => {
                    try{
                        const data = await load()
                        setInitialState(data);
                    } catch(e){
                        setError(e as Error);
                    }
                    setIsLoading(false);
                }
                fetchInitialState()
            }, [])

            if (isLoading) {
                return <div>Loading</div>
            }
            if (error) {
                return <div>error.message</div>
            }
            
            return ( // this will be the AppStateProvider
                <WrappedComponent {...props} initialState={initialState}/>
            )
        }
    }

    // 