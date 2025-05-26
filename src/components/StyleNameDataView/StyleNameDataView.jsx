import {useParams} from "react-router";
import {gql, useMutation, useQuery} from "@apollo/client";
import './StyleNameDataView.css';
import {useState} from "react";

const styleNameDataById = gql`
query StyleNameDataById($id: String!) {
  StyleNameDataById(id: $id) {
    id
    styleName
    priority
  }
}`
;

const EditStyleData = gql`
  mutation EditStyleNameData($id: String!, $style: String!, $stylePriority: Int!) {
  editStyleNameData(id: $id, styleName: $style, priority: $stylePriority) {
    id
    styleName
    priority
  }
}
`;


const StyleNameDataView = ()=> {
    const {id} = useParams();
    const [stylePriority, setStylePriority] = useState(0);
    const [style, setStyle] = useState("");

    const {data, loading, error} = useQuery(styleNameDataById, {
        variables: {id}
    });

    const [editStyleData] = useMutation(EditStyleData, {
        variables: {
            id,
            stylePriority,
            style,
        }
    });

    if(loading) return <div>Loading style data...</div>
    if(error) return <div>Error :c {error.message}</div>

    const {styleName, priority} = data.StyleNameDataById;

    const handlePriorityChange = event => {
        setStylePriority(Number(event.target.value));
        setStyle(styleName);
    }


    return (
        <>
            <h1>Style priority Editor Panel</h1>
            <div>
                <h1>Style: {styleName}</h1>
                <div className='field'>
                    <div>Priority:</div>
                    <input onChange={handlePriorityChange} placeholder='Priority' type='number' defaultValue={priority}/>
                </div>
            </div>
            <div>
                <button onClick={editStyleData}>submit</button>
            </div>
        </>
    );
}

export default StyleNameDataView;