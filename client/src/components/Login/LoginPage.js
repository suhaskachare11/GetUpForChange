import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link,  useNavigate } from "react-router-dom";
import "./LoginPage.css";
import axios from 'axios'
import ErrorMessage from '../../ErrorHandler/ErrorMessage';

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
      const userInfo = localStorage.getItem('userInfo')

      if(userInfo){
        navigate('/home')
      }
    },[navigate])

    const submitHandler = async (e) => {
      e.preventDefault();
      
      try{

        const config = {
          headers :{
            "Content-type" : "application/json"
          }
        }

        const {data} = await axios.post('http://localhost:5000/api/users/login',{email,password},config)

        console.log(data)

        setError('')

        localStorage.setItem('userInfo',JSON.stringify(data))

        navigate('/home');

      }catch(error){
          setError(error.response.data.message)
          console.log(error)
      }
    };

    return (

          
             
          <div className="loginContainer">
            <div className="innerContainer">
            <h1>LOGIN PAGE</h1>
            {
              error && <ErrorMessage variant='danger'>{error}</ErrorMessage>
            }
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" style={{marginTop:'10px'}}>
                Submit
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                Don't have an Account ? <Link to="/register">Register Here</Link>
              </Col>
            </Row>

            </div>
            
          </div>
      );
    }

export default LoginPage