import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import Cities from '../components/city/Cities';
import Login from "../components/login/Login";
import UserPage from '../components/user/UserPage';
import { selectSite } from "../store/slices/siteInfo";
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const App = () => {
    const currentSite = useSelector(selectSite);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchMegye = searchParams.get('megye') || '';

    useEffect(() => {
        if (currentSite === null || currentSite === "logout") {
            navigate("/");
        }
        else if (currentSite === "userpage") {
            navigate("/userpage");
        }
        else if (currentSite === "city") {
            navigate("/cities");
        }
        else if (currentSite === "query") {
            navigate("/cities?megye=" + searchMegye);
        }

    }, [navigate, currentSite, searchMegye]);

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/userpage" element={<UserPage />} />
            </Route>
            <Route path="/cities" element={<Cities />} />
        </Routes>
    );
};

export default App;