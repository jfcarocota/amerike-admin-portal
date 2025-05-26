import { gql, useMutation, useQuery } from '@apollo/client';
import './CharacterView.css';
import { useState } from 'react';
import { useParams } from 'react-router';

const StyleNameList = gql`
  query StyleNameDataList {
  StyleNameDataList {
    id
    styleName
    priority
  }
}
`;

const CharacterDataById = gql`
  query CharacterDataById($characterDataByIdId: String!) {
  CharacterDataById(id: $characterDataByIdId) {
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

const EditCharacterData = gql`
  mutation EditCharacterData($editCharacterDataId: String!, $moveSpeed: Float!, $jumpForce: Float!, $styleNameId: String!) {
  editCharacterData(id: $editCharacterDataId, moveSpeed: $moveSpeed, jumpForce: $jumpForce, styleNameId: $styleNameId) {
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

const CharacterView = ()=> {
  
  const {id} = useParams();
  const [jumpForce, setJumpForce] = useState(Number("5"));
  const [moveSpeed, setMoveSpeed] = useState(Number("3"));
  const [styleName, setStyleName] = useState("");

  const {data, loading, error} = useQuery(CharacterDataById, {
    variables: {
      characterDataByIdId: id,
    }
  });
  const styleNameListQuery = useQuery(StyleNameList);
  const [editCharacterData] = useMutation(EditCharacterData, {
    variables: {
      editCharacterDataId: id, 
      moveSpeed, 
      jumpForce, 
      styleNameId: styleName 
    }
  });

  if(loading) return <div>Loading chracters...</div>
  if(error) return <div>Error :c {error.message}</div>

  const handleStyleNameChange = event => {
    console.log(event.target.value);
    return setStyleName(event.target.value);
  }
  const handleMoveSpeedChange = event => setMoveSpeed(parseFloat(event.target.value));
  const handleJumpForceChange = event => setJumpForce(parseFloat(event.target.value));

  return(
    <>
      <h1>Character Editor Panel</h1>
          <div>
            <h2>Player: {data.CharacterDataById.id}</h2>
            <div className='field'>
              <div>Style Name: </div>
              <select defaultValue={data.CharacterDataById.styleName.id}
              id='styleNameSelect' onChange={handleStyleNameChange} name="stylenames">
              {styleNameListQuery.data.StyleNameDataList.map(styleNameData => (
                <option
                key={styleNameData.id} 
                value={styleNameData.id}>
                  {styleNameData.styleName}
                </option>
              ))}
              </select>
            </div>
            <div className='field'>
              <div>Move Speed: </div>
              <input placeholder="Move Speed" onChange={handleMoveSpeedChange} type="number" defaultValue={data.CharacterDataById.moveSpeed}/>
            </div>
            <div className='field'>
              <div>Jump Force: </div>
              <input placeholder="Jump Force" onChange={handleJumpForceChange} type="number" defaultValue={data.CharacterDataById.jumpForce}/>
            </div>
            <div>
              <button onClick={editCharacterData}>submit</button>
            </div>
          </div>
      
    </>
  );
};

export default CharacterView;