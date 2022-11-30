import React from "react";

function RestaurantRegistration1({ formData, setFormData }) {

    const changeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  return (

    <div className="personal-info-container">

<div className="restaurantname">
        <input
            type="text"
            placeholder="Restaurant name..."
            name="restaurantname"
            value={formData.restaurantname}
            onChange={changeHandler}
        />
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
            value={formData.resturantAddress}
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

export default RestaurantRegistration1;
