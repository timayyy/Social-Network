import React, { useState, useEffect } from "react";
import "./Login.css"
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
// import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
// import { motion } from "framer-motion"



const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // const redirect = location.search ? location.search.split("=")[1] : "/dashboard";
  console.log(error)

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      // history.push(redirect);
      console.log(userInfo)
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h3><span className="hero-fancy-text">Welcome back!</span> <span>Log in to continue</span></h3>
      <hr />
      {/* {error && <Message variant='danger'>{error}</Message>} */}
      <Form onSubmit={submitHandler}>
        <Form.Group className="form__group field" controlId='email'>
          <Form.Control
            className={error && error.email || error && error.message ? "form__field is-invalid" : "form__field"}
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          // style={{{error && error.email ? borderBottom: "red" : null}}
          // {(error && error.email) && style={{borderBottom: "red"}}}
          ></Form.Control>
          {(error && error.email || error && error.message) && (
            <div className="invalid-feedback">
              {error.email || error && error.message}
            </div>
          )}
          <Form.Label className="form__label">Enter email</Form.Label>

        </Form.Group>
        {/* {(error && error.email) && <Message variant='danger'>{error.email}</Message>} */}
        <Form.Group className="form__group field" controlId='password'>
          <Form.Control
            className={error && error.password ? "form__field is-invalid" : "form__field"}
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          {(error && error.password) && (
            <div className="invalid-feedback">
              {error.password}
            </div>
          )}
          <Form.Label className="form__label">Enter password</Form.Label>
        </Form.Group>
        <button type='submit' className='btn btn-block custom-btn-primary' disabled={loading ? true : false}>
          {loading ? (
            <div class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
              <span>Log in</span>
            )}
        </button>
      </Form>

      <Row className='py-3'>
        <Col>
          Not yet a member? <Link to='/signup' className="ml-l">Sign up here</Link>
        </Col>
      </Row>
    </FormContainer >
  );
};

export default LoginScreen;
