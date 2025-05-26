import {Link} from "react-router";

const MainView = ()=> {
    return (
        <>
            <h1>Main Portal</h1>
            <div className='list'>
                <div>
                    <Link to='/characters'>Characters List</Link>
                </div>
                <div>
                    <Link to='/styles'>Styles List</Link>
                </div>
            </div>
        </>
    );
}

export default MainView;