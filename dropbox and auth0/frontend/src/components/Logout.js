import { GoogleLogout } from 'react-google-login';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const clientId = "698590027106-eu0smltjguhnh35qja617q6ovpbp6pbg.apps.googleusercontent.com";


function Logout()
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const onSuccess = (res) =>
    {
        console.log("Logout successfull!");
        setIsLoggedIn(true);
    }
    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}
export default Logout;