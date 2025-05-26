import { Route, Routes } from 'react-router'
import CharacterView from './components/CharacterView/CharacterView'
import CharactersDataListView from './components/CharactersListView/CharactersListView'

const App = ()=> {

  return (
    <Routes>
      <Route index element={<CharactersDataListView/>}/>
      <Route path='character/:id' element={<CharacterView/>}/>
    </Routes>
  )
}

export default App
