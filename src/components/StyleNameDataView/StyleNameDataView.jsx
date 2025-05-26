import {useParams} from "react-router";

const StyleNameDataView = ()=> {
    const {id} = useParams();

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

export default StyleNameDataView;