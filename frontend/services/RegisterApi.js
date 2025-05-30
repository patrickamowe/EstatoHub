const registerUser = async (data) => {
    const HOST = '192.168.0.101';
    const response = await fetch(`http://${HOST}:8000/api/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    return await response.json();
   
};

export default registerUser;