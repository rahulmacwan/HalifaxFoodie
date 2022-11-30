import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';    
import { useNavigate } from "react-router-dom";


function CustomerDashboard() {
    const navigate = useNavigate();
    const logout = () => {
        navigate(`/login`)
        //do not allow user to go back to dashboard
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };

        localStorage.clear();
    }
    return (
        <div>

            <h1>CustomerDashboard</h1>
            
            <button onClick={logout}>logout</button>
        </div>
    )

}
export default CustomerDashboard