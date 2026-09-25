 import { useState } from 'react';
 import { Users_Authenticate } from '../api/Users_Authenticate';

 
 function AuthControl({setActiveComponent}) {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [authResponse, setAuthResponse] = useState<any[]>([]);

    const handleNameChange = (e) => {
        setUserName(e.target.value); 
    };

    const handlePasswordChange = (e) => {
            setPassword(e.target.value)
    };

    const handleAuthSubmit = async (e) => {
       
        e.preventDefault(); 
        setLoading(true);
        try
        {
            setAuthResponse( await Users_Authenticate(username , password));
            console.log('Authentication response:', authResponse);
            setActiveComponent("OrderScreen");
        } 
        catch (error) 
        {
            console.error('Error making POST request:', error);
        } 
        finally 
        {
            setLoading(false);
        }
    }

  return (
    <form onSubmit={handleAuthSubmit}>
       <span>
            Username:
            &nbsp;
            &nbsp;
            <input 
                type="text" 
                name="username" 
                value={username} 
                onChange={handleNameChange} 
            />
        </span>
        <br />
        <span>
            Password:
            &nbsp;
            &nbsp;
            <input 
                type="password" 
                name="password" 
                value={password} 
                onChange={handlePasswordChange} 
            />
        </span>
        <br />
        <button type="submit" style={{ marginTop: '15px' }} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
    </form>
  );
}

export default AuthControl;