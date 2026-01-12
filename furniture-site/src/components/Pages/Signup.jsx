import React, { useRef, useState } from 'react'
import { Row, Form, FormControl, Button, Alert, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { LoginThunk } from '../../Store/authSlice';
import "../CSS/Signup.css";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [error, setError] = useState(null);
    
    const emailRef = useRef();
    const passRef = useRef();
    const confRef = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();

        const enteredEmail = emailRef.current.value.toLowerCase();
        const enteredPassword = passRef.current.value;

        if(isSignUp){
            const enteredConfirmPass = confRef.current.value;

            if(enteredConfirmPass !== enteredPassword){
                setError("Passwords do not match!");
                return;
            }
        }
        console.log(enteredEmail);
        console.log(enteredPassword);

        const res = await dispatch(LoginThunk({ email: enteredEmail, password: enteredPassword, authMode: isSignUp }));

        if( !LoginThunk.rejected.match(res)){
            const user  = localStorage.getItem('user');
            console.log("user logged in" + user);

            navigate('/Home');
        }else{
            setError(res.payload);
        }
        
    };
  return (
    <>
        <div className="signup-wrapper">
            <div className="signup-card">
                <h1>{isSignUp ? "Signup" : "Login" }</h1>
                <Form onSubmit={submitHandler} onChange={()=> setError(null)}>
                    <Row className='mb-3'>
                        <Col className='input-field'>
                            <i className="fa-regular fa-envelope logo"></i>
                            <FormControl type='email' name='email' placeholder='Email Address' required ref={emailRef}/>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col className='input-field'>
                            <i className="fa-solid fa-lock logo"></i>
                            <FormControl type={showPass? 'text' : 'password'} placeholder='Password' require ref={passRef}/>
                            <span onClick={()=> setShowPass(prev => !prev)}>
                                <i className={showPass ? "far fa-eye-slash" : "far fa-eye"}></i>
                            </span> 
                        </Col>
                    </Row>
                    {isSignUp && <Row className='mb-3'>
                        <Col className='input-field'>
                            <i className="fa-solid fa-lock logo"></i>
                            <FormControl type={showConfirmPass? 'text' : 'password'} placeholder='Confirm Password' required ref={confRef}/>
                            <span onClick={()=> setShowConfirmPass(prev => !prev)}>
                                <i className={showPass ? "far fa-eye-slash" : "far fa-eye"}></i>
                            </span> 
                        </Col>
                    </Row >}
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Row className='mb-3 mt-3'>
                        <Col>
                            <Button type='submit' variant='primary'>
                                {isSignUp ? 'SignUp' : 'Login' }
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div onClick={()=> setIsSignUp(prev => !prev)} className="signup-option">
                {isSignUp ? "Have an account? Login" : "Create an account "}
            </div>
        </div>
    </>
  )
}

export default Signup