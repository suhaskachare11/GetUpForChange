import React, { useState } from 'react'
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import ErrorMessage from '../../ErrorHandler/ErrorMessage';
import "./RegisterPage.css";
import axios from 'axios'


const RegisterPage = () => {

  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[phoneNumber,setPhoneNumber] = useState('')
  const[password,setPassword] = useState('')
  const[confirmPassword,setConfirmPassword] = useState('')
  // const[message,setMessage] = useState(null)
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const submitHandler = async(e)=>{
      e.preventDefault()

      // if(password!=confirmPassword){
      //   setMessage('Passwords do not match')
      // }else{

      //   setMessage(null);

        try{

          const config = {
            headers :{
              "Content-type" : "application/json"
            }
          }
  
          const {data} = await axios.post('http://localhost:5000/api/users/register',{
            name,email,phoneNumber,password,confirmPassword
          },
          config)
  
          console.log(data)
  
          localStorage.setItem('userInfo',JSON.stringify(data))

          setError(false)

          navigate('/home')

  
        }catch(error){
            setError(error.response.data.message)
            console.log(error)
        }
      // }
  }


  return (
    <div className="registerContainer">
      <div className="innerRgContainer">
      <h1>REGISTER PAGE</h1>
    {/* {
      message && <ErrorMessage variant='danger'>{message}</ErrorMessage>
    } */}
    {
      error && <ErrorMessage variant='danger'>{error}</ErrorMessage>
    }
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="formBasicName">
        <Form.Label >Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label className='rgText'>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPhoneNumber">
        <Form.Label className='rgText'>Phone Number</Form.Label>
        <Form.Control
          type="text"
          value={phoneNumber}
          placeholder="Enter Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className='rgText'>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicConfirmPassword">
        <Form.Label className='rgText'>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{marginTop:'20px'}}>
        Submit
      </Button>
    </Form>
    <Row className="py-3">
      <Col>
        Already have a Account ? <Link to="/">Login Here</Link>
      </Col>
    </Row>

      </div>
    
  </div>
  )
}

export default RegisterPage