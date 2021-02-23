import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/dashboard";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      console.log(userInfo)
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, password2));
  };

  return (
    <FormContainer>
      <h3><span className="hero-fancy-text">Sign up</span> <span>to get in touch with your community</span></h3>
      <hr />
      {/* {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />} */}
      <Form onSubmit={submitHandler}>
        <Form.Group className="form__group field" controlId='name'>
          <Form.Control
            className={error && error.name ? "form__field is-invalid" : "form__field"}
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
          {(error && error.name) && (
            <div className="invalid-feedback">
              {error.name}
            </div>
          )}
          <Form.Label className="form__label">Name</Form.Label>
        </Form.Group>
        <Form.Group className="form__group field" controlId='email'>
          <Form.Control
            className={error && error.email || error && error.message ? "form__field is-invalid" : "form__field"}
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          {(error && error.email || error && error.message) && (
            <div className="invalid-feedback">
              {error.email || error.message}
            </div>
          )}
          <Form.Label className="form__label">Email Address</Form.Label>
        </Form.Group>

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
          <Form.Label className="form__label">Password</Form.Label>
        </Form.Group>
        <Form.Group className="form__group field" controlId='confirmpassword'>
          <Form.Control
            className={error && error.password2 ? "form__field is-invalid" : "form__field"}
            type='password'
            placeholder='Confirm password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></Form.Control>
          {(error && error.password2) && (
            <div className="invalid-feedback">
              {error.password2}
            </div>
          )}
          <Form.Label className="form__label">Confirm Password</Form.Label>
        </Form.Group>
        <button type='submit' className='btn btn-block custom-btn-primary' disabled={loading ? true : false}>
          {loading ? (
            <div class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
              <span>Register</span>
            )}
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
