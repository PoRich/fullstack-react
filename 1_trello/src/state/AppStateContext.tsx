import { useImmerReducer } from "use-immer";
import { 
    createContext, 
    Dispatch,
    useContext,
    useEffect } from "react"
import { Action } from './actions'
import { 
    appStateReducer,
    AppState,
    Task, 
    List } from "./AppStateReducer";
import { DragItem } from "../DragItem";
import { save } from "../api"
import { withInitialState } from "../withInitialState";

/*
// Initial hardcoded State lists = Columns, tasks = todos
const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold"}]
        },
        {
            id: "1",
            text: "In Progress", 
            tasks: [{id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            text: "Done", 
            tasks: [{id: "c3", text: "Begin to use static typing" }]
        }
    ],
    draggedItem: null,
}
*/

// Creating Context 
type AppStateContextProps = {
    lists: List[]
    draggedItem: DragItem | null
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>(
    {} as AppStateContextProps
    );

export const useAppState = () => {
    return useContext(AppStateContext);
}

type AppStateProviderProps = {
    children: React.ReactNode
    initialState: AppState
}

// Context Provider
export const AppStateProvider = withInitialState<AppStateProviderProps>(
    ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState)
    
    // save state any time it changes
    useEffect(()=>{
        save(state)
    }, [state]);

    const { lists, draggedItem } = state
    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || []
    }
    
    return (
        <AppStateContext.Provider value={{ lists, draggedItem, getTasksByListId, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
})
