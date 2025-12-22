import React, { useRef, useState } from 'react'
import { Form, FormControl, FormGroup, Row, Col, Button, Alert } from 'react-bootstrap'
import "../CSS/Signup.css";
import Authenticate, { checkAccess } from '../../API/Authentication';
import { useNavigate } from 'react-router';

const Signup = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passRef = useRef();
    const [error, setError] = useState(null);
    const [showPass, setShowPass ] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passRef.current.value;

        const access = await checkAccess(enteredEmail);
        if(!access){
            setError("Unauthorised!")
            return;
        }
        const response = await Authenticate(enteredEmail, enteredPassword);
        if(!response.ok){
            setError(response.error);
            return;
        }

        console.log("logged in");
        navigate("/dashboard");
        
    };
  return (
    <>
        {/* //navbar */}
        
        <div className="signup-wrapper">
            <div className="signup-container">   
                <i className="fa-solid fa-fingerprint logo"></i>
                <h1 className='mb-4 mt-2'>Admin Login</h1>             
                <Form onSubmit={submitHandler} onChange={()=> setError(null)}>                        
                    <Row className='mb-3'>
                        <Col className='input-field'>
                            <i className="fa-regular fa-envelope logo"></i>
                            <FormControl placeholder='Email Address' type='email' ref={emailRef} />
                        </Col>
                    </Row>
                    <Row className='mb-3 '>
                        <Col className='pw-field input-field'>
                            <i className="fa-solid fa-lock logo"></i>
                            <FormControl placeholder='Password' type={showPass? 'text': 'password'} ref={passRef}/>
                            <span onClick={()=> setShowPass(prev => !prev)}>
                                <i className={showPass ? "far fa-eye-slash" : "far fa-eye"}></i>
                            </span> 
                        </Col>
                    </Row>
                    {error && <Alert variant='dark' >{error}</Alert>}
                    <Row className='mb-4'>
                        <Col>
                           <Button type='submit' variant='primary'>Login</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    </>
  )
}

export default Signup