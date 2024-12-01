import React, { useState, useEffect } from "react";
import axios from 'axios';

const SignUp = (props) => {
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
    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/
    if (!passwordValidation.test(password) && password.length > 0) {
      setPasswordMessage("Password must contain lowercase, uppercase, digit and special character");
    } else {
      setPasswordMessage("");
    }
  }, [password])

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleRegister = async () => {
    try {
      console.log(username)
      console.log(email)
      console.log(password)
      const request = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/user/signup',
        data: { username, email, password }

      });
      if (request.status === 201) {
        setMessage(`user: ${email} was successfully registered`);
        setTimeout(() => setMessage(""), 3000);
      }else {
        setMessage(request.data.msg);
      }

    } catch (error) {
      console.error("Error:", error); // ++
      res.status(500).json({ error: error.message || 'Internal server error' });
      next(error);
  }
  };


  //username, email, password, img

  return <div className="register">
    <input type="text" placeholder="username" onChange={handleUsername} /><br />
    <input type="text" placeholder="email" onChange={handleEmail} /><br />
    <input type="password" placeholder="password" onChange={handlePassword} /><br />

    <button onClick={handleRegister}>Register</button><br />
    {emailMessage ? <span>{emailMessage}</span> : ""}<br />
    {passwordMessage ? <span>{passwordMessage}</span> : ""}<br />
    <span>{message}</span><br />
  </div>;

};

export default SignUp;