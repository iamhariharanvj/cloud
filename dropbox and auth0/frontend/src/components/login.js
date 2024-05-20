import { GoogleLogin } from 'react-google-login';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const clientId = "698590027106-eu0smltjguhnh35qja617q6ovpbp6pbg.apps.googleusercontent.com";

function Login()
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const onSuccess = (res) =>
    {
        console.log("Login success! user info :", res.profileObj);
        setIsLoggedIn(true);
    }
    const onFailure = (res) =>
    {
        console.log("Login Failed res :", res);
    }
    if (isLoggedIn) {
        return <Navigate to="/home" replace />;
    }
    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />
        </div>
    )
}
export default Login;