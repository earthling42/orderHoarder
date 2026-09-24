 import { useState } from 'react';
 import { Users_Authenticate } from '../api/Users_Authenticate';
 import { Users_List } from '../api/Users_List.tsx';
 
 function AuthControl() {
    
    // const [formData, setFormData] = useState({
    //     username: '',
    //     password: ''
    // });
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [authResponse, setAuthResponse] = useState(null);

    const handleNameChange = (e) => {
        setUserName(e.target.value); 
    };

    const handlePasswordChange = (e) => {
            setPassword(e.target.value)
    };

    const handleAuthSubmit = async (e) => {
        console.log('handleAuthSubmit called with username:', username, 'and password:', password);
        e.preventDefault(); 
        setLoading(true);
        try
        {
            //setAuthResponse( await Users_Authenticate(username , password))
            setAuthResponse( await Users_List())
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
           authResponse: {authResponse}
        </span>       
        <br />
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
          {loading ? 'Submitting...' : 'Submit'}
        </button>
    </form>
  );
}

export default AuthControl;