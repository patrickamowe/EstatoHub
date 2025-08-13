import SecureStorage from '../utils/SecureStorage';

const token = SecureStorage.getItem('accessToken');
console.log("Access Token:", token);

export default async function ListingApi(data) {
     // const HOST = '192.168.0.101';
    const HOST = '192.168.0.174';
    const URL = `http://${HOST}:8000/api/listing`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}
