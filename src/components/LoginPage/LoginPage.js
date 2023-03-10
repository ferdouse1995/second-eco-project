import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import app from "../../firebase.init";
import SignInWithGoogle from "../SignInWithGoogle/SignInWithGoogle";
import "./LoginPage.css";

const auth = getAuth(app);
const LoginPage = () => {
  const [passWordError, setPassWordError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleLogin = (event) => {
    event.preventDefault();
    setSuccess(false);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    setPassWordError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        form.reset();
      })
      .catch((error) => {
        console.error("error", error);
        setPassWordError(error.message);
      });
  };
  return (
    <>
      <div className="container pt-5">
        <SignInWithGoogle />
        <Form className="loginPage text-center pt-5" onSubmit={handleLogin}>
          <h3 className="pb-3">LogIn</h3>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="emailForm mx-auto"
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>

            <Form.Control
              className="passwordForm mx-auto"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Link to="/forgetPassword">Forgot your password?</Link>

          <p className="text-danger">{passWordError}</p>
          {success && <p className="text-success">Successfully LogIn</p>}
          <Button className="logInButton" variant="primary" type="submit">
            LogIn
          </Button>
          <div className="d-flex align-items-center justify-content-center">
            <p className="pt-3 pe-4">Don't have an account?</p>
            <Link to="/registration">Registration</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
