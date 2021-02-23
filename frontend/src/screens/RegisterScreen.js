import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
// import { register } from "../actions/userActions";

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  return (
    <FormContainer>
      <h3><span className="hero-fancy-text">Sign up</span> <span>to get in touch with your community</span></h3>
      <hr />
      {/* {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />} */}
      <Form>
        <Form.Group className="form__group field" controlId='name'>
          <Form.Control
            className="form__field"
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
          <Form.Label className="form__label">Name</Form.Label>
        </Form.Group>
        <Form.Group className="form__group field" controlId='email'>
          <Form.Control
            className="form__field"
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Form.Label className="form__label">Email Address</Form.Label>
        </Form.Group>

        <Form.Group className="form__group field" controlId='password'>
          <Form.Control
            className="form__field"
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <Form.Label className="form__label">Password</Form.Label>
        </Form.Group>
        <Form.Group className="form__group field" controlId='confirmpassword'>
          <Form.Control
            className="form__field"
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
          <Form.Label className="form__label">Confirm Password</Form.Label>
        </Form.Group>
        <button type='submit' className='btn custom-btn-primary'>
          Register
        </button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?
          <Link
            className='ml-1'
            to="/login"
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
