
export async function loginApi(data) {
    // const HOST = '192.168.0.101';
    const HOST = '192.168.0.174';
    const URL = `http://${HOST}:8000/api/token`;
    
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    return await response.json();
   
}

export async function registerApi(data) {
    // const HOST = '192.168.0.101';
    const HOST = '192.168.0.174';
    const URL = `http://${HOST}:8000/api/signup`;
    
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    return await response.json();
   
}