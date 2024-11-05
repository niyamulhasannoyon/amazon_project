import { useContext, useState } from 'react';
import { UserContext } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramewaork } from "./LoginManager";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


    function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
    isSignedIn: false,
    photoURL: '',
    displayName: '',
    email: '',
    // newUser: false
    });
    initializeLoginFramewaork();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }

    const signOut = () => {
        handleSignOut()
        .then(res => {
            handleResponse(res, false);
        })
    }

    const fbSignIn = () => {
        handleFbSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }

    const handleResponse = (res, replace) => {
        setUser(res);
        setLoggedInUser(res);
        if(replace){
            navigate(from, { replace: true });
        } else {
            navigate(from);
        }
        }

    const handleBlur = (e) => {
    console.log(e.target.name, e.target.value);
    let isFieldValid = true;
    if(e.target.name === 'email'){
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        isFieldValid = emailPattern.test(e.target.value);
        console.log(isFieldValid);
    }

    if(e.target.name === 'password'){
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isPasswordValid = passwordPattern.test(e.target.value);
        isFieldValid = isPasswordValid ;
        console.log(isFieldValid);
    }
    if(isFieldValid){
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
    }
    }

    const handleSubmit = (e) => {
    // console.log(user.email, user.password)
    if(newUser && user.email && user.password){
        createUserWithEmailAndPassword(user.name,user.email, user.password)
        .then(res => {
            handleResponse(res, true);
        })
        .catch(error => {
            console.log("Sign-up error:", error.message);
            setUser({ ...user, error: error.message, success: false });
        });
    }
    if (newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            handleResponse(res, true);
        })
        .catch(error => {
            console.log("Sign-in error:", error.message);
            setUser({ ...user, error: error.message, success: false });
        });
    }
    e.preventDefault();
    }


    return (
        <div style={{textAlign:'center'}}>
            {
            user.isSignedIn? <button onClick={signOut}>Sign out</button> : 
            <button onClick={googleSignIn}>Sign in</button>
            }
            <br/> <br/>
            {
            <button onClick={fbSignIn}>Sign in with Facebook</button>
            }
            {
            user.isSignedIn &&
            <div>
                <img style={{borderRadius:"50%"}} src={user.photo} alt="User" />
                <h3>Welcome {user.name} !!</h3>
                <p>{user.email}</p>
            </div>
            }

            <h2>Our Own Authentication</h2>

            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign up</label>

        <form onSubmit={handleSubmit}>
            {
            newUser && <input name='name' onBlur={handleBlur} type="text" placeholder='Your Name' />
            } <br/><br/>
            <input type="text" name='email' onBlur={handleBlur} placeholder='Enter your Email' required /> <br/><br/>
            <input type="password" name='password' onBlur={handleBlur} placeholder='Enter your Password' required/> <br/><br/>
            <input type="submit" value={newUser? 'Sign up' : 'Sign In'} />
        </form>
            {
                user.success &&
                <p style={{color: 'green'}}>User { newUser ? 'created' : 'logged In'} successfully</p>
            }
            {
                user.error &&
                <p style={{color:'red'}}>{user.error}</p>
            }

        </div>
    )
    }
    export default Login;
