const fetchWorkoutNames = (id) => {
    return fetch('http://localhost:8000/api/workouts/account/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
        },
    })
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
    })
    .then(data => {
        // Process the retrieved workout names\
        return data;
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with your fetch operation:', error);
        throw error;
    });
};

const fetchWorkoutExcersises = (id, workoutId) => {
    return fetch('http://localhost:8000/api/workouts/'+ workoutId + '/exercises/' + 1, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
        },
    })
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
    })
    .then(data => {
        // Process the retrieved workout names\
        console.log(data);
        return data;
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with your fetch operation:', error);
        throw error;
    });
};

const putExcersisePortion = (userId, workoutId, body) => {
    return fetch('http://localhost:8000/api/workouts/'+ workoutId + '/exercises/' + userId + "/add/", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            console.log(response.json());
            throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
    })
    .then(data => {
        // Process the retrieved workout names\
        console.log(data);
        return data;
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with your fetch operation:', error);
        throw error;
    });
};

const createWorkout = (body) => {
    return fetch('http://localhost:8000/api/workouts/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            console.log(response.json());
            throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
    })
    .then(data => {
        // Process the retrieved workout names\
        console.log(data);
        return data;
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with your create operation:', error);
        throw error;
    });
};

export {
    fetchWorkoutNames,
    fetchWorkoutExcersises,
    putExcersisePortion,
    createWorkout,
};
