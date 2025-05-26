import CharactersDataListView from "../CharactersListView/CharactersListView.jsx";
import {useNavigate} from "react-router";
import {gql, useQuery} from "@apollo/client";

const styleNameDataList = gql`
    {
        StyleNameDataList {
            id
            styleName
            priority
      }
    }
`;

const StyleNameDataListView = ()=> {
    const navigate = useNavigate();
    const {error, data, loading} = useQuery(styleNameDataList);
    if(loading) return <div>Loading styles...</div>
    if(error) return <div>Error :c {error.message}</div>

    const showEditView = (id)=> navigate(`/styles/${id}`);

    return (
        <>
            <h1>Styles Editor Panel</h1>
            {
                data.StyleNameDataList.map(styleNameData => {
                    const {styleName, priority, id} = styleNameData;
                    return (
                        <div key={id}>
                            <div>Style: {styleName} Priority: {priority}</div>
                            <div>
                                <button onClick={() => showEditView(id)}>Edit</button>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
}

export default StyleNameDataListView;