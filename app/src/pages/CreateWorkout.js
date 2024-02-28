import React, { useEffect, useState } from 'react';
import { Container, Row, Form, Dropdown, Modal, Button, DropdownButton, Col } from 'react-bootstrap';

function CreateWorkout() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [workoutPlan, setWorkoutPlan] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        sets: '',
        reps: '',
        weight: '',
        workoutName: '',
        image: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
              //const response = await fetch('https://api.example.com/user/workout');
              //const result = await response.json();
              //TODO: Remove this default when backend is ready
              const defaultWorkouts = [
                { id: 1, name: 'Upper body' },
                { id: 2, name: 'Legs' },
                { id: 3, name: 'Core' },
                { id: 4, name: 'Cardio' },
              ];
              setWorkouts(defaultWorkouts);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleWorkoutSelect = (workout) => {
        console.log(workoutPlan);
        setSelectedWorkout(workout);
        setWorkoutPlan(getWorkoutPlan(workout));
        console.log(workoutPlan);
        setIsDropdownOpen(false);
    };

    const getWorkoutPlan = (workout) => {
        //TODO: Add call to backend for given workout
        console.log(workout);
        const defaultWorkouts = {
            "Upper body": [
                {id: 1, item : { "name": "dumbell curl", reps: 1, sets: 2, weight: 100}},
                {id:2, item : { name: "bench press", reps: 1, sets: 2, weight: 1200}}
            ]
        }
        console.log(defaultWorkouts[workout]);
        return defaultWorkouts[workout];
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

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setFormData({ ...formData, image: imageFile });
    };

    const handleAddPortion = () => {
        // Handle adding portion logic here
        console.log('Adding portion:', formData);
        //TODO: add call to backend to save the changes to workout
        // Clear form data
        setFormData({
            sets: '',
            reps: '',
            weight: '',
            workoutName: '',
            image: null,
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
                        <Button key={index} onClick={() => handleWorkoutSelect(item.name)}>
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
                            <p>{item.item.name}</p>
                        </Col>
                        <Col className='col-2'>
                            <p>{item.item.reps}</p>
                        </Col>
                        <Col className='col-2'>
                            <p>{item.item.sets}</p>
                        </Col>
                        <Col className='col-2'>
                            <p>{item.item.weight}</p>
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
                            <Form.Group controlId="formWorkoutName">
                                <Form.Label>Workout Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter workout name"
                                    name="workoutName"
                                    value={formData.workoutName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formImage">
                                <Form.Label>Upload Image (Optional)</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
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