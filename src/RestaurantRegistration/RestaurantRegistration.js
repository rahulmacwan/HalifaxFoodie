import React, { useState } from "react";
import Registration1 from "./RestaurantRegistration1";
import Registration2 from "./RestaurantRegistration2";
import Registration3 from "./RestaurantRegistration3";
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '../Configs/UserPool';
import {db} from '../Configs/Firebaseconfig';
import {addDoc, collection, getDocs} from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";


import axios from 'axios';
import { useNavigate } from "react-router-dom";


function RestaurantRegistration() {
  let data ={}
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    restaurantname: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    answer1: "",
    answer2: "",
    answer3: "",
    key: "",
    plaintext: ""
  });


const formValidation2 = () => {
  if(formData.answer1 === "" || formData.answer2 === "" || formData.answer3 === "") {
    alert("Please answer all security questions");
    return false;
  }
  return true;
}
const formValidation3 = () => {
  if(formData.key === "" || formData.plaintext === "") {
    alert("Please enter a key and plaintext");
    return false;
  }
  //key can only be integer not string
  else if(isNaN(formData.key)) {
    alert("Key must be an integer");
    return false;
  }

  else if(formData.key.length !== 4) {
    alert("Key must be 4 characters long");
    return false;
  }

  else if(formData.key.indexOf(" ") !== -1) {
    alert("Key cannot contain spaces");
    return false;
  }
  return true;
}


  const formValidation1 = () => {
  
    var SpecialSym =['^','$','*','.','[',']','{','}','(', ')', '?', '-', '!', '@', '#', '%', '&', '/', ',', '>', '<', ':', ';', '|', '_', '~', '`','+','='];
    if (formData.restaurantname === "") {
      alert("Please enter a restaurant name");
      return false;
    }
    else if (formData.firstName === "") {
      alert("Please enter your first name");
      return false;
    } else if (formData.lastName === "") {
      alert("Please enter your last name");
      return false;
    } else if (formData.email === "") {
      alert("Please enter your email");
      return false;
    } else if(formData.email.indexOf("@") === -1) {
      alert("Please enter a valid email");
      return false;
    } else if (formData.password === "") {
      alert("Please enter your password");
      return false;
    } else if(formData.password.length < 8) {
      alert("Password must be at least 8 characters");
      return false;
    } else if(formData.password.indexOf(" ") !== -1) {
      alert("Password cannot contain spaces");
      return false;
    } else if (formData.password.indexOf("1") === -1 && formData.password.indexOf("2") === -1 && formData.password.indexOf("3") === -1 && formData.password.indexOf("4") === -1 && formData.password.indexOf("5") === -1 && formData.password.indexOf("6") === -1 && formData.password.indexOf("7") === -1 && formData.password.indexOf("8") === -1 && formData.password.indexOf("9") === -1 && formData.password.indexOf("0") === -1) {
      alert("Password must contain at least one number");
      return false;
    } 
    //password must contain at least one uppercase letter
    else if (formData.password === formData.password.toLowerCase()) {
      alert("Password must contain at least one uppercase letter");
      return false;
    }
    //password must contain at least one lowercase letter
    else if (formData.password === formData.password.toUpperCase()) {
      alert("Password must contain at least one lowercase letter");
      return false;
    }  
    // else if (formData.password.indexOf(SpecialSym) === -1) {
    //   alert("Password must contain at least one special character");
    //   return false;
    // } 
    
    else if (formData.address === "") {
      alert("Please enter your address");
      return false;
    } else if (formData.phoneNumber === "") {
      alert("Please enter your phone number");
      return false;
    } else if (formData.phoneNumber.length !== 10) {
      alert("Please enter a valid phone number");
      return false;
    }
    return true;
  }


  const FormTitles = ["Registration1", "Registration2", "Registration3"];

  const PageDisplay = () => {
    if (page === 0) {
      return <Registration1 formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <Registration2 formData={formData} setFormData={setFormData} />;
    } else {
      return <Registration3 formData={formData} setFormData={setFormData} />;
    }
  };
  const storeUserInCognito = () => {
    const attributeList = [];
      attributeList.push(
        new CognitoUserAttribute({
          Name: 'email',
          Value: formData.email,
        })
      );
      UserPool.signUp(formData.firstName, formData.password, attributeList, null, (err, data) => {
        if (err) {
          console.log(err);
          alert("Couldn't sign up");
        } else {
          console.log(data);
          alert('User Added Successfully');
        }
      });
  }

  const storeDataInDynamoDB = () => {
    // POST request using fetch with error handling
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Max-Age': '86400', 'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin' },
        body: JSON.stringify(formData)
    };

    fetch('https://ylu2zikiiircel5br6qjsetoqi0uypqt.lambda-url.us-east-1.on.aws/', requestOptions)
        .then(async response => {
            const data = await response.json();

            console.log(response);

        })
        .catch(error => {
            
            console.error('There was an error!', error);
        });
}

const storeUserInFirestore = async () => {
    
  data = {
    answer1: formData.answer1,
    answer2: formData.answer2,
    answer3: formData.answer3,
  }
    await setDoc(doc(db, "QuestionAnswers", formData.email), data);
    }


const generateCipherText = () => {
  // POST request using fetch with error handling
  const requestOptions = {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Max-Age': '86400', 'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin' },
      body: JSON.stringify(formData)
  };

  fetch('https://7wifiavmc567oaivzwmiowm7yu0txjvn.lambda-url.us-east-1.on.aws/', requestOptions)
      .then(async response => {
          const data = await response.json();
          console.log(response);
          //get the cipher text from the response
          
          alert("Please save this CipherText. You will need this to login." + JSON.stringify(data));

      })
      .catch(error => {
          
          console.error('There was an error!', error);
      });
}


  const submitHandler = () => {
    if (page === FormTitles.length - 1) {
      if(formValidation3(formData)){
        alert("FORM SUBMITTED");
        console.log(formData);
        
        storeUserInCognito();
        storeDataInDynamoDB();
        storeUserInFirestore();
        generateCipherText();
        navigate('/login');
        
    } 
  }
  else {
      if(page===0){
        
        if (formValidation1(formData)) {
          setPage((currPage) => currPage + 1);  
        }
        
      }
      else if(page===1){
        if (formValidation2(formData)) {
          setPage((currPage) => currPage + 1);  
        }
  
      }
      else if(page===2){
        if (formValidation3(formData)) {
          setPage((currPage) => currPage + 1);  
        }
        
      }
      
    }
  }

  return (
    <div className="form">
      <div className="progressbar">
        <div
          style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}
        ></div>
      </div>
      <div className="form-container">
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          <button
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          <button
            onClick={submitHandler}
            >

            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantRegistration;
