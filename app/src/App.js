import React, {useState} from 'react';
import { Navbar, Nav, Button, Modal, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateWorkout from './pages/CreateWorkout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleLoginModalClose = () => setShowLoginModal(false);
    const handleLoginModalShow = () => setShowLoginModal(true);

    const handleLogin = () => {
        // Logic to handle login
        // You can add your login functionality here
        // For demonstration purposes, let's just close the modal
        setIsLoggedIn(true);
        handleLoginModalClose();
    };

    return (
        <Router >
            <div>
            <Navbar bg="dark" variant="dark">
                <Nav className="mx-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href='/create-workout'>Create Workout</Nav.Link>
                </Nav>
                <Nav>
                    {!isLoggedIn && <Button variant="outline-light" onClick={handleLoginModalShow}>Login</Button>}
                    {isLoggedIn && <Button variant='primary' onClick={() => {setIsLoggedIn(false)}}>Logout</Button>}
                </Nav>
            </Navbar>
            <br />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<HomePage />} />
                <Route path="/logout" element={<HomePage />} />
                <Route path="/create-workout" element={<CreateWorkout />} />
            </Routes>
            </div>
            <Modal show={showLoginModal} onHide={handleLoginModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleLoginModalClose}>Close</Button>
                        <Button variant="primary" onClick={handleLogin}>Login</Button>
                    </Modal.Footer>
                </Modal>
        </Router>
    );
}

export default App;