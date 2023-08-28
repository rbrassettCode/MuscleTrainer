import React from 'react';
import Exercise from './Exercise';

function ExerciseList({ exercises, onDelete }) {
    return (
        <div>
            {exercises.map(exercise => (
                <Exercise key={exercise.id} exercise={exercise} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default ExerciseList;