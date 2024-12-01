import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";

const SignUp = () => {

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");


  useEffect(() => {
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailValidation.test(email) && email.length > 0) {
      setEmailMessage("Email must have a valid format");
    } else {
      setEmailMessage("");
    }
  }, [email])

  
  useEffect(() => {
    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    if (!passwordValidation.test(password) && password.length > 0) {
      setPasswordMessage("Password must contain lowercase letters, uppercase letters, digits, and be at least 8 characters long.");

    } else {
      setPasswordMessage("");
    }
  }, [password])

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const request = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/user/signup',
        data: { username, email, password }

      });
      if (request.status === 201) {
        setMessage(`user: ${email} was successfully registered`);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(request.data.msg);
      }

    } catch (error) {
      console.error("Error:", error); // ++
      res.status(500).json({ error: error.message || 'Internal server error' });
      next(error);
    }
    setLoading(false);
  };


  //username, email, password, img

  return <div className="signUp">

    <article id="divSignUp">
      <div>
        <h2>Sign Up 🎮</h2>
      </div>
      <div>
        <input type="text" placeholder="username" onChange={handleUsername} />
        <input type="text" placeholder="email" onChange={handleEmail} />
        <input type="password" placeholder="password" onChange={handlePassword} />

        <button onClick={handleRegister}>Register</button>
        {emailMessage ? <h6>{emailMessage}</h6> : ""}
        {passwordMessage ? <h6>{passwordMessage}</h6> : ""}
        <h6>{message}</h6>
      </div>
      {loading ? ( <HashLoader color="#fff" />) : ""}
    </article>
    
  </div>;

};

export default SignUp;