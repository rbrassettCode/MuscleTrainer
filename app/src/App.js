import React, { useState } from 'react';

import ExerciseList from './pages/ExerciseList';
import AddExercise from './pages/AddExercise';

function App() {
    const [exercises, setExercises] = useState([]);
    const [idCounter, setIdCounter] = useState(0);

    const handleAdd = (exercise) => {
        setExercises([...exercises, { ...exercise, id: idCounter }]);
        setIdCounter(idCounter + 1);
    };

    const handleDelete = (id) => {
        setExercises(exercises.filter(exercise => exercise.id !== id));
    };

    return (
        <div className="app">
            <h1>Workout Trainer</h1>
            <AddExercise onAdd={handleAdd} />
            <ExerciseList exercises={exercises} onDelete={handleDelete} />
        </div>
    );
}

export default App;