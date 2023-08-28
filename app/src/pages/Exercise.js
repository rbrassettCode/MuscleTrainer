import React from 'react';

function Exercise({ exercise, onDelete }) {
    return (
        <div className="exercise">
            <h3>{exercise.name}</h3>
            <p>Sets: {exercise.sets}</p>
            <p>Reps: {exercise.reps}</p>
            <button onClick={() => onDelete(exercise.id)}>Delete</button>
        </div>
    );
}

export default Exercise;