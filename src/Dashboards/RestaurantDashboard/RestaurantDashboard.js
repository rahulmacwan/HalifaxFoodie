import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';    
import S3 from 'react-aws-s3';
import { useNavigate } from "react-router-dom";

function RestaurantDashboard() {
    const navigate = useNavigate();
   const navigateUploadRecipe = () => {
        navigate(`/UploadRecipe`)
    }


    

    const navigateExtractIngredients = () => {
        navigate(`/ExtractIngredients`)
    }


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

        
        
        <div style={{backgroundColor: "#F5F5F5"}}>


        
            <h1>RestaurantDashboard</h1>
        <div>
            
            <button onClick={navigateUploadRecipe}> Upload recipes </button>
        </div>

        <div>
            
            <button onClick={navigateExtractIngredients}> Extract ingredients from Recipes </button>
            
        </div>
        
        
        <div>
            <button onClick={logout}>logout</button>
        </div>
        


        </div>
        
    )

}
export default RestaurantDashboard