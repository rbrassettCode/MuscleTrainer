import React, {useEffect, useState} from 'react';
import { Navbar, Nav, Button, Modal, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {registerNewUser, loginUser, logoutUser} from './service/AuthService.js';
import HomePage from './pages/HomePage';
import CreateWorkout from './pages/CreateWorkout';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterUser from './pages/RegisterUser.js';

function App() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleLoginModalClose = () => setShowLoginModal(false);
    const handleLoginModalShow = () => setShowLoginModal(true);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        // Store tokens in localStorage whenever they change
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }, [accessToken, refreshToken]);

    const handleLogin = async () => {
        await loginUser(formData.username, formData.password)
            .then(response => {
                setFormData({
                        username: '',
                        password: ''
                    });
                localStorage.setItem('accessToken', response['access']);
                localStorage.setItem('refreshToken', response['refresh']);
                setIsLoggedIn(true);
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
        handleLoginModalClose();
    };

    const handleLogout = () => {
        console.log(localStorage.getItem('accessToken'));
        logoutUser(localStorage.getItem('accessToken'));
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false)
    }

    return (
        <Router >
            <div>
            <Navbar bg="dark" variant="dark">
                <Nav className="mx-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href='/create-workout'>Create Workout</Nav.Link>
                </Nav>
                <Nav className='mx-2'>
                    {!isLoggedIn && <Button variant="outline-light" onClick={handleLoginModalShow}>Login</Button>}
                    {isLoggedIn && <Button variant='primary' onClick={handleLogout}>Logout</Button>}
                </Nav>
            </Navbar>
            <br />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create-workout" element={<CreateWorkout />} />
                <Route path='/user/registration' element={<RegisterUser/>} />
            </Routes>
            </div>
            <Modal show={showLoginModal} onHide={handleLoginModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to='/user/registration'>
                            <Button variant="secondary" onClick={handleLoginModalClose}>Sign Up</Button>
                        </Link>
                        <Button variant="secondary" onClick={handleLoginModalClose}>Close</Button>
                        <Button variant="primary" onClick={handleLogin}>Login</Button>
                    </Modal.Footer>
                </Modal>
        </Router>
    );
}

export default App;