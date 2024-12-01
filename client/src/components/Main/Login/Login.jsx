import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { context } from "../../../context/context";

const Login = () => {

  const { updateProfile } = useContext(context);

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

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      // Llamada a la api con los datos del form para hacer login
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/user/login',
        data: { email, password },
        withCredentials: true
      });

      // // Las 3 líneas que hacen la magia de que se quede guardado el rol
      // // Con el header ya se envía la cabecera con el token, no hay que manejarlo a mano
      // En las futuras solicitudes por axios se enviará encabezado el token
      const authHeader = response.headers.authorization;
      axios.defaults.headers.common['Authorization'] = authHeader;

      updateProfile({email: email});

    } catch (error) {
      console.log(error.message);
    }
  };



  //username, email, password, img

  return <div className="login">
    <input type="text" placeholder="email" onChange={handleEmail} /><br />
    <input type="password" placeholder="password" onChange={handlePassword} /><br />

    <button onClick={handleLogin}>Login</button><br />
    {emailMessage ? <span>{emailMessage}</span> : ""}<br />
    {passwordMessage ? <span>{passwordMessage}</span> : ""}<br />
    <span>{message}</span><br />
  </div>;

};

export default Login;