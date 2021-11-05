import { useDrop } from "react-dnd";
import { useRef } from "react";
import { throttle } from "throttle-debounce-ts";
import { CardContainer } from "./styles";
import { moveTask } from "./state/actions";
import { isHidden } from "./utils/isHidden";
import { useAppState } from "./state/AppStateContext";
import { useItemDrag } from "./utils/useItemDrag";


type CardProps = {
    text: string 
    id: string 
    columnId: string 
    isPreview?: boolean
}

export const Card = ({ 
    text,
    id,
    columnId, 
    isPreview
}: CardProps) => {
    const { draggedItem, dispatch } = useAppState();
    const ref = useRef<HTMLDivElement>(null);
    
    const { drag } = useItemDrag({ type: "CARD", id, columnId, text});

    const [, drop] = useDrop({
        accept: "CARD",
        hover: throttle(300, () => {
            if(!draggedItem){
                return;
            }
            if (draggedItem.type !== "CARD") {
                return;
            }
            if (draggedItem.id === id) {
                return;
            }
            dispatch(
                moveTask(draggedItem.id, id, draggedItem.columnId, columnId)
            )
        }) 
    })

    drag(drop(ref));
    return (
        <CardContainer
            isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
            isPreview={isPreview}
            ref={ref}
            >
            {text}
        </CardContainer>
    )
}