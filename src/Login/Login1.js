import React from "react";
import { useNavigate } from "react-router-dom"



function Login1({ formData, setFormData }) {

    const changeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const navigate = useNavigate()

const onClickHandler = () => navigate(`/RestaurantRegistration1`)

  return (

    <div className="personal-info-container">

    <div className="email">
        <input
            type="text"
            placeholder="Email..."
            name="email"
            value={formData.email}
            onChange={changeHandler}
        />
    </div>
    <div className="password">
        <input
            type="text"
            placeholder="Password..."
            name="password"
            value={formData.password}
            onChange={changeHandler}
        />
    </div>

    </div>
    );
}

export default Login1;
