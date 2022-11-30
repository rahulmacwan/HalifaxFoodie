import React from "react";
import { useNavigate } from "react-router-dom"



function Registration1({ formData, setFormData }) {

    const changeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const navigate = useNavigate()

const onClickHandler = () => navigate(`/RestaurantRegistration1`)

  return (

    <div className="personal-info-container">


<div>
    <button
        type="submit"
            onClick={() => {
                onClickHandler();
            }}
          >
            Sign up as a restaurant
            
          </button>
</div>

    <div className="firstname">
        <input
            type="text"
            placeholder="First Name..."
            name="firstName"
            value={formData.firstName}
            onChange={changeHandler}
        />
    </div>
    
    <div className="lastname">
        <input

            type="text"
            placeholder="Last Name..."
            name="lastName"
            value={formData.lastName}
            onChange={changeHandler}
        />
    </div>

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
    <div className="address">
        <input
            type="text"
            placeholder="Address..."
            name="address"
            value={formData.address}
            onChange={changeHandler}
        />
    </div>
    <div className="phonenumber">
        <input
            type="text"
            placeholder="Phone Number..."
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={changeHandler}
        />

    </div>

    </div>
    );
}

export default Registration1;
