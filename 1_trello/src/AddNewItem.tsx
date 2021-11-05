import { useState } from "react"
import { AddItemButton } from "./styles"
import { NewItemForm } from "./NewItemForm"

type AddNewItemsProps = {
    onAdd(text: string): void  // callback function triggered when Create button is clicked
    toggleButtonText: string  // text rendered when this component is a button 
    dark?: boolean  // flag passed to the styled component
}

export const AddNewItem = (props: AddNewItemsProps) => {
    const [showForm, setShowForm] = useState(false);
    const { onAdd, toggleButtonText, dark } = props; 

    if (showForm){
        // We show item creation form here
        return (
            <NewItemForm
                onAdd={text => {
                    onAdd(text)
                    setShowForm(false)
                }}
            />
        )
    }

    return (
        <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
            {toggleButtonText}
        </AddItemButton>
    )
}