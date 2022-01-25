import React from 'react';
import { useSelector } from "react-redux";
import Cities from './components/Cities';
import Login from "./components/Login";
import UserPage from './components/UserPage';
import { selectUser } from "./features/userSlice";

const App = () => {
    const user = useSelector(selectUser);
    return (
        <div>
            {user === "city" ? <Cities /> : (user ? <UserPage /> : <Login />)}
        </div>
    );
};

export default App;