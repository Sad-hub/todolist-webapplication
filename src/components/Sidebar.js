// Importing necessary hooks and context from React.
import React, { useContext, useEffect, useRef } from 'react'
import { TodoContext } from '../context'

// Defining the Sidebar function component.
// It accepts 'children' as props, which are the elements to be rendered inside the Sidebar.
function Sidebar({ children }){
    // Creating a reference to the Sidebar DOM element.
    const sidebarRef = useRef()

    // Accessing the TodoContext to use the setSelectedTodo function.
    const { setSelectedTodo } = useContext(TodoContext)

    // Effect hook to set up and clean up a click listener on the document.
    useEffect(() => {
        // Adding a click event listener to the document.
        document.addEventListener('click', handleClick)
        
        // Cleanup function to remove the event listener when the component unmounts.
        return () => document.removeEventListener('click', handleClick)
    }, []) // Empty dependency array ensures this effect runs only once after the initial render.
    
    // Function to handle click events.
    const handleClick = e => {
        // Checking if the click is outside the sidebar.
        if( e.target === sidebarRef.current || sidebarRef.current.contains(e.target)){
            // If the click is inside the sidebar, set the selectedTodo to false.
            setSelectedTodo(false)
        }
    }

    // Render method of the component.
    return (
        // Sidebar container with a reference to the sidebarRef.
        <div
            className='Sidebar'
            ref={sidebarRef}
        >
            {children}
        </div>
    )
}

// Exporting the Sidebar component for use elsewhere in the application.
export default Sidebar