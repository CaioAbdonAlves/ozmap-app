import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import UpdateUser from '../pages/UpdateUser';

function RoutesApp() {
    return(
        <Routes>
            <Route path='/' element={ <Dashboard /> }/>
            <Route path='/users' element={ <Customers /> }/>
            <Route path='/updateuser/:id' element={ <UpdateUser /> }/>
        </Routes>
    );
}

export default RoutesApp;