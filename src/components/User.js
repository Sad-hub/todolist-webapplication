// Importing React and a logo image.
import React from 'react'
import logo from "../images/logo.jpg"

// Defining the User function component.
function User(){

    // Render method of the component.
    return (
        // Container for the User component.
        <div className='User'>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className='info'>
                <p>DoDay</p>
                <a href="#">Logout!</a>
            </div>
        </div>
    )
}

// Exporting the User component for use elsewhere in the application.
export default User
