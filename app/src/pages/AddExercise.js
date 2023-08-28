import React, { useState } from 'react';

function AddExercise({ onAdd }) {
    const [name, setName] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ name, sets, reps });
        setName('');
        setSets('');
        setReps('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Exercise Name" 
                required 
            />
            <input 
                value={sets} 
                onChange={e => setSets(e.target.value)} 
                placeholder="Sets" 
                required 
            />
            <input 
                value={reps} 
                onChange={e => setReps(e.target.value)} 
                placeholder="Reps" 
                required 
            />
            <button type="submit">Add Exercise</button>
        </form>
    );
}

export default AddExercise;