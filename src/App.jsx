import { Route, Routes } from 'react-router'
import CharacterView from './components/CharacterView/CharacterView'
import CharactersDataListView from './components/CharactersListView/CharactersListView'
import StyleNameDataListView from "./components/StyleNameDataListView/StyleNameDataListView.jsx";
import StyleNameDataView from "./components/StyleNameDataView/StyleNameDataView.jsx";
import MainView from "./components/MainView/MainView.jsx";

const App = ()=> {

  return (
    <Routes>
        <Route index element={<MainView/>}/>
        <Route path='/characters' element={<CharactersDataListView/>}/>
        <Route path='/styles/' element={<StyleNameDataListView/>}/>
        <Route path='character/:id' element={<CharacterView/>}/>
        <Route path='/styles/:id' element={<StyleNameDataView/>}/>
    </Routes>
  )
}

export default App
