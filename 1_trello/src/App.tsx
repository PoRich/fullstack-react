import { AddNewItem } from "./AddNewItem";
import { AppContainer } from './styles';
import { Column } from './Column';
import { CustomDragLayer } from "./CustomDragLayer";
import { useAppState } from "./state/AppStateContext";
import { addList } from './state/actions';
require('dotenv').config({path: '../.env'});


export const App = () => {
  const { lists, dispatch } = useAppState()
  return (
  <AppContainer>
    <CustomDragLayer />
    {lists.map((list) =>(
      <Column text={list.text} key={list.id} id={list.id} />
    ))}
    <AddNewItem
      onAdd={text => dispatch(addList(text))}
      toggleButtonText="+ Add Another List"
    />
  </AppContainer>
  );
}