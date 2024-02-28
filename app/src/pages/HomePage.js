import React from 'react';
import { Container, Row } from 'react-bootstrap';

function HomePage({ exercise, onDelete }) {
    return (
        <Container>
            <Row>
                <h2>HomePage</h2>
            </Row>
            <Row>
                <p>Welcome to your new healthier, loving lifestyle</p>
            </Row>
        </Container>
    );
}

export default HomePage;