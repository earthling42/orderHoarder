import { HttpPost } from './HttpHandler';

export async function Users_Authenticate(username :string, password :string) {
    const credentials = { username, password };
    let response :any[] = [];
    try {
        //response = await HttpPost("Users/Authenticate", credentials);
        response =  [{ "userID": 42, "username": "Albert", "role": "Kwisatz Haderach" }];
        if (response && "error" in response)
        {
            throw new Error(`HTTP error! status: ${response.error}`);
        }
        } catch (error) {
            console.error('Error making POST request:', error);
    } 
    return (response);
};

