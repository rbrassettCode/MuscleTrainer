import React, { useEffect, useState } from 'react';
import { Container, Row, Form, Modal, Button, Col } from 'react-bootstrap';
import {fetchWorkoutNames, fetchWorkoutExcersises, putExcersisePortion} from '../service/WorkoutService.js';

function CreateWorkout() {
    const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
    const [workoutPlan, setWorkoutPlan] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        sets: '',
        reps: '',
        weight: '',
        name: ''
    });

    useEffect(() => {
        fetchWorkoutNames(1)
            .then(workoutNames => {
                console.log(workoutNames);
                setWorkouts(workoutNames);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }, []);

    const handleWorkoutSelect = (id, workout) => {
        console.log(id + " " + workout);
        setSelectedWorkout(workout);
        setSelectedWorkoutId(id);
        getWorkoutPlan(1, id);
    };

    const getWorkoutPlan = async (id, workoutId) => {
        await fetchWorkoutExcersises(id, workoutId)
            .then(workout => {
                console.log(workout);
                setWorkoutPlan(workout);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalShow = () => {
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddPortion = async () => {
        // Handle adding portion logic here
        console.log('Adding portion:', formData);
        await putExcersisePortion(1, selectedWorkoutId, formData)
            .then(workout => {
                setWorkoutPlan(workout);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
        
        setWorkoutPlan([...workoutPlan, formData]);

        setFormData({
            sets: '',
            reps: '',
            weight: '',
            name: '',
        });
        // Close the modal
        handleModalClose();
    };

    return (
        <Container>
            <Row>
                <h1>Exercise Routines</h1> 
            </Row>
            <Row>
                {workouts.map((item, index) => (
                    <Col className='col-2 mr-auto'>
                        <Button key={index} onClick={() => handleWorkoutSelect(item.id, item.name)}>
                        {item.name}
                        </Button> 
                    </Col>
                ))}
            </Row>
            <Row>
                <h2>Current Workout: {selectedWorkout}</h2>
            </Row>
            
                {workoutPlan.map((item, index) => (
                    <Row key={index}>
                        <Col className="col-6">
                            <p>{item.name}</p>
                        </Col>
                        <Col className='col-2'>
                            <p>{item.reps}</p>
                        </Col>
                        <Col className='col-2'>
                            <p>{item.sets}</p>
                        </Col>
                        <Col className='col-2'>
                            <p>{item.weight}</p>
                        </Col>
                    </Row>
                ))}
             
            <Row>
                {selectedWorkout && <Button variant="success" onClick={handleModalShow}>Add an excersise</Button>}
            </Row>
            {/* Modal for adding new portion */}
            <Row>
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Portion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formWorkoutName">
                                <Form.Label>Workout Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter workout name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formSets">
                                <Form.Label>Sets</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter sets"
                                    name="sets"
                                    value={formData.sets}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formReps">
                                <Form.Label>Reps</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter reps"
                                    name="reps"
                                    value={formData.reps}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formWeight">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter weight"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAddPortion}>
                            Add Portion
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        </Container>
    );
}

export default CreateWorkout;