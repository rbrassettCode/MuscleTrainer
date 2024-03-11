const registerNewUser = (username, password) => {
    return fetch('http://localhost:8000/api/user/register/', {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
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
        console.error('There was a problem with your register operation:', error);
        throw error;
    });
};

const loginUser = (username, password) => {
    return fetch('http://localhost:8000/api/user/login/', {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
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
        console.error('There was a problem with your login operation:', error);
        throw error;
    });
};

const logoutUser = (authToken) => {
    return fetch('http://localhost:8000/api/user/logout/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
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
        console.error('There was a problem with your logout operation:', error);
        throw error;
    });
};

export {
    registerNewUser,
    loginUser,
    logoutUser
};
