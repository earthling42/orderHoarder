 import { useRef, useState , useEffect} from 'react';
 import { Users_Authenticate } from '../api/Users_Authenticate';

 
 function AuthControl({parentSetActiveComponentCallback}) {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationPassed, setValidationPassed] = useState(false);
    const [authResponse, setAuthResponse] = useState<any[]>([]);

    const handleNameChange = (e) => {
        setUserName(e.target.value); 
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect( () => {
        setValidationPassed( usernameRef.current.value !== "" && passwordRef.current.value !== "" );
    }
    , [username , password])

    const handleAuthSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        try
        {
            const authenticatResponse = await Users_Authenticate(username , password);
            setAuthResponse(authenticatResponse);
            parentSetActiveComponentCallback("OrderScreen");
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
    <div>
        <h1 className='heading-h1'>Order Hoarder</h1>
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
                    ref={usernameRef}
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
                    ref={passwordRef}
                />
            </span>
            <br />
            <button type="submit" style={{ marginTop: '15px' }} disabled={loading || !validationPassed}>
            {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    </div>
  );
}

export default AuthControl;