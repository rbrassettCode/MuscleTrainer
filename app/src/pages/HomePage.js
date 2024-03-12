import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage({ exercise, onDelete }) {
    return (
        <Container>
            <Row>
                <h2>HomePage</h2>
            </Row>
            <Row>
                <p>Welcome to your new healthier, loving lifestyle. Register for free below:</p>
            </Row>
            <Row>
                <Link to='/user/registration'>
                    <Button variant="secondary" >Sign Up</Button>
                    </Link>
            </Row>
        </Container>
    );
}

export default HomePage;