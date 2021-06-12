import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
function Login(props) {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAdress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";
  const handleLogin = () => {};
  useEffect(() => {
    document.title = "Gram-Login";
  }, []);
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      This Is login Page!!.{" "}
    </div>
  );
}

export default Login;
