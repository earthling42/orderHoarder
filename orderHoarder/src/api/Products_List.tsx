import { HttpGet, HttpPost } from './HttpHandler';

export async function Products_List() {
    
    let response = [];
    console.log('Attempting to get Users_List');

    try {
        response = await HttpGet("Products_List");
        if (response && "error" in response)
        {
            throw new Error(`HTTP error! status: ${response.error}`);
        }
    } catch (error) {
            console.error('Error making GET request:', error);
    }
    
    return (response);
};

