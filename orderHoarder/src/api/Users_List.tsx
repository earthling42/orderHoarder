import { HttpGet, HttpPost } from './HttpHandler';

export async function Users_List() {
    
    let response = [];
    try {
        response = await HttpGet("Users");
        if (response && "error" in response)
        {
            throw new Error(`HTTP error! status: ${response.error}`);
        }
    } catch (error) {
            console.error('Error making GET request:', error);
    }
    
    return (response);
};

