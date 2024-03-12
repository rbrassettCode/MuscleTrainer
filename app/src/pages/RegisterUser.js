import React, { useState } from 'react';
import { Alert, Button, Container, Form, Row } from 'react-bootstrap';
import { registerNewUser } from '../service/AuthService';
import { Link , useNavigate } from 'react-router-dom';

function RegisterUser({ exercise, onDelete }) {
    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);

    const handleShowAlert = () => setShowAlert(true);
    const handleHideAlert = () => setShowAlert(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerNewUser(formData)
            .then(response => {
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: ''
                });
                navigate('/'); 
            })
            .catch(error => {
                // Handle any errors
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000); 
                console.error(error);
            });

    };
    
    return (
        <Container>
            <Alert show={showAlert} variant="danger" onClose={handleHideAlert} dismissible>
                Error occured when creating account
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" name="firstName" value={formData.firstName} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" name="lastName" value={formData.lastName} onChange={handleChange} />
                </Form.Group>
                <Button className='my-4' variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
}

export default RegisterUser;