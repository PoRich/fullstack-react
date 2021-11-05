import { useRef } from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { AddNewItem } from "./AddNewItem";
import { addTask, moveList, moveTask, setDraggedItem } from "./state/actions";
import { ColumnContainer, ColumnTitle } from "./styles";
import { Card } from "./Card";
import { useAppState } from "./state/AppStateContext";
import { useItemDrag } from "./utils/useItemDrag";
import { isHidden } from "./utils/isHidden";


type ColumnProps = {
    text: string
    id: string
    isPreview?: boolean
}

export const Column = ({ text, id, isPreview }: ColumnProps) => {
    const { draggedItem, getTasksByListId, dispatch } = useAppState();
    const tasks = getTasksByListId(id);
    const ref = useRef<HTMLDivElement>(null)

    const [, drop] = useDrop({
        accept: ["COLUMN", "CARD"],  // Column is a drop target for other columns and cards (e.g., empty columns)
        hover: throttle(300, () =>{
            if (!draggedItem){
                return ;
            }
            if (draggedItem.type === "COLUMN") {
                if (draggedItem.id === id){
                    return ;
                }
                dispatch(moveList(draggedItem.id, id))
            } else {  // if draggedItem.type === "CARD"
                if (draggedItem.columnId === id) {
                    return  // ignore if same column
                }
                if (tasks.length) {
                    return  // ignore if column is not empty
                }
                // hoveredItemId is null because the column is empty
                dispatch(
                    moveTask(draggedItem.id, null, draggedItem.columnId, id)
                )// Set columnId of draggedItem
                dispatch(setDraggedItem({...draggedItem, columnId: id }))
            }
        })
    })
    
    const { drag } = useItemDrag({ type: "COLUMN", id, text})
    drag(drop(ref))

    return (
        <ColumnContainer 
            ref={ref} 
            isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)} 
            isPreview={isPreview}
            >
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map((task) => (
                <Card 
                    id={task?.id}  
                    columnId={id}
                    text={task?.text} 
                    key={task?.id} 
                    />
            ))}
            <AddNewItem
                toggleButtonText="+ Add Another Card"
                onAdd={text => dispatch(addTask(text, id))}
                dark
            />
        </ColumnContainer>
    )
}