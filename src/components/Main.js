// Importing the React library.
import React from 'react'

// Defining the Main function component.
// It accepts a single prop 'children' which represents the child components that will be passed into Main.
function Main({ children }){

    // Render method of the component.
    return (
        // A div with a class name 'Main' which acts as a container for the children elements.
        <div className='Main'>
            {children}
        </div>
    )
}

// Exporting the Main component for use in other parts of the application.
export default Main