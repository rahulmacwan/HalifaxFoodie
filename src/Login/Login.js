import React, { useState } from "react";
import Login1 from "./Login1";
import Login2 from "./Login2";
import Login3 from "./Login3";

import UserPool from "../Configs/UserPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import {db} from "../Configs/Firebaseconfig";

import {addDoc, collection, doc, getDoc} from "firebase/firestore";





function Login() {
    
  const userCollection = collection(db, "QuestionAnswers");
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    answer1: "",
    answer2: "",
    answer3: "",
    ciphertext: "",
  });

  const formValidation2 = () => {
    if(formData.answer1 === "" || formData.answer2 === "" || formData.answer3 === "") {
      alert("Please answer all security questions");
      return false;
    }
    return true;
  }
  const formValidation3 = () => {
    if(formData.ciphertext === "") {
      alert("Please enter a ciphertext");
      return false;
    }
    return true;
  }
  
  
  
    const formValidation1 = () => {
      if (formData.email === "") {
        alert("Please enter your email");
        return false;
      } else if(formData.email.indexOf("@") === -1) {
        alert("Please enter a valid email");
        return false;
      } else if (formData.password === "") {
        alert("Please enter your password");
        return false;
      } 
      return true;
    }


      //get data from firestore for a specific user
const getdata = async () => {
  const docRef = doc(db, "QuestionAnswers", formData.email);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      var answer1 = docSnap.data().answer1;
      var answer2 = docSnap.data().answer2;
      var answer3 = docSnap.data().answer3;
      if(answer1 === formData.answer1 && answer2 === formData.answer2 && answer3 === formData.answer3) {
      alert("Correct answers");
      setPage((currPage) => currPage + 1); 
      }
      else {
      alert("Incorrect answers");
      }
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}

    const authenticateUserUsingCognito = () => {
      const user = new CognitoUser({
          Username: formData.email,
          Pool: UserPool
      })
      const authDetails = new AuthenticationDetails({
          Username: formData.email,
          Password: formData.password
      })
      user.authenticateUser(authDetails, {
          onSuccess: (data) => {
              console.log("onSuccess: ", data)
              setPage((currPage) => currPage + 1);  
          },
          onFailure: (err) => {
              alert("Incorrect email or password")
          }
      })

  
  }

  const ciphertextforCustomer = () => {

    // POST request using fetch with error handling
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Max-Age': '86400', 'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin' },
        body: JSON.stringify(formData)
    };

    fetch('https://3tesarwbkmin5m2u2ilxmsrb4a0fibfb.lambda-url.us-east-1.on.aws/', requestOptions)
        .then(async response => {
            const data = await response.json();

            console.log(response);
            var ciphertext = JSON.stringify(data);
                var stringwithoutquotes = ciphertext.replace(/['"]+/g, '');


                if(stringwithoutquotes === formData.ciphertext) {
                  navigate("/CustomerDashboard");
                }
                else {
                    alert("Incorrect ciphertext");
                    }
            

        })
        .catch(error => {
            
            console.error('There was an error!', error);
        });


  }

  const ciphertextforRestaurant = () => {

    // POST request using fetch with error handling
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Max-Age': '86400', 'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin' },
        body: JSON.stringify(formData)
    };

    fetch('https://sujj5roew6ye6fwxeeaiwvguuu0ddwxy.lambda-url.us-east-1.on.aws/', requestOptions)
        .then(async response => {
            const data = await response.json();
            console.log(response);

            var ciphertext = JSON.stringify(data);
            var stringwithoutquotes = ciphertext.replace(/['"]+/g, '');


            if(stringwithoutquotes === formData.ciphertext) {
              navigate("/RestaurantDashboard");
            }
            else {
                alert("Incorrect ciphertext");
                }

        })
        .catch(error => {
            
            console.error('There was an error!', error);
        });
}
  const checkCustomerLambda = () => {
    // POST request using fetch with error handling
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Max-Age': '86400', 'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin' },
        body: JSON.stringify(formData)
    };
  
    fetch('https://taar64njhgfd4np4eea3lshzay0usvlt.lambda-url.us-east-1.on.aws/', requestOptions)
        .then(async response => {
            const data = await response.json();
            //response to string
            alert("Please save this CipherText. You will need this to login." + JSON.stringify(data));
            if(JSON.stringify(data) === '"true"') {
              //if the user is a customer, go to the next page
             ciphertextforCustomer();
            localStorage.setItem("email", formData.email);
            localStorage.setItem("CustomerType", "Customer");
             // navigate(`/CustomerDashboard`);
            }
            else{
                //if the user is not a customer, go to the next page
               
               ciphertextforRestaurant();
                localStorage.setItem("email", formData.email);
                localStorage.setItem("CustomerType", "Restaurant");     
               // navigate(`/RestaurantDashboard`);
            }
        })
        .catch(error => {
            
            console.error('There was an error!', error);
        });
  }

  const FormTitles = ["Login1", "Login2", "Login3"];

  const PageDisplay = () => {
    if (page === 0) {
      return <Login1 formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <Login2 formData={formData} setFormData={setFormData} />;
    } else {
      return <Login3 formData={formData} setFormData={setFormData} />;
    }
  };

    

  const submitHandler = () => {
    if (page === FormTitles.length - 1) {
      if(formValidation3(formData)){
        alert("FORM SUBMITTED");
        console.log(formData);

        
        



        

        checkCustomerLambda();
        
        
    } 
  }
  else {
        if(page===0){
        
        if (formValidation1(formData)) {
          authenticateUserUsingCognito();
          
        }
        
      }
      else if(page===1){
        if (formValidation2(formData)) {
          getdata();

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

export default Login
