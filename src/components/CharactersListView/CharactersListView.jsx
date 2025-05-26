import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router";

const CharacterDataList = gql`
  {
    CharacterDataList {
      id
      moveSpeed
      jumpForce
      styleName {
        id
        styleName
        priority
      }
    }
  }
`;

const CharactersDataListView = ()=> {
  const navigate = useNavigate();
  const {data, loading, error} = useQuery(CharacterDataList);

  if(loading) return <div>Loading chracters...</div>
  if(error) return <div>Error :c {error.message}</div>

  const showEditView = (id)=> navigate(`/character/${id}`);

  return (
    <>
      <h1>Character Editor Panel</h1>
      {
        data.CharacterDataList.map(characterData => {
          return (
            <div key={characterData.id}>
              <h2>Player: {characterData.styleName.styleName} Priority: {characterData.styleName.priority}</h2>
              
              <div>
                <button onClick={()=> showEditView(characterData.id)}>Edit</button>
              </div>
            </div>
          );
        })
      }
    </>
  );
}

export default CharactersDataListView;