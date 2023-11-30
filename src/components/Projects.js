// Importing necessary React hooks and components.
import React, {useContext, useState} from 'react'
import { CaretUp, Palette, PencilFill } from 'react-bootstrap-icons'
import AddNewProject from './AddNewProject'
import Project from './Project'
import { TodoContext } from '../context'
import { useSpring, animated } from 'react-spring'

// Defining the Projects function component.
function Projects(){
    // State variables.
    const [showMenu, setShowMenu] = useState(true); // Controls visibility of the projects menu.
    const [edit, setEdit] = useState(false) // Controls whether edit mode is active.
    const pencilColor = edit ? "#1EC94C" : "#000000" // Determines the color of the edit icon.

    // Accessing the TodoContext to get the list of projects.
    const { projects } = useContext(TodoContext)

    // Animation for the arrow icon.
    const spin = useSpring({
        transform : showMenu ? 'rotate(0deg)' : 'rotate(180deg)', // Rotates based on the showMenu state.
        config : { friction : 10 } // Configuration for the animation.
    })
    
    // Animation for displaying or hiding the projects menu.
    const menuAnimation = useSpring({
        display : showMenu ? 'block' : 'none',
        lineHeight : showMenu ? 1.2 : 0
    })

    // Render method of the component.
    return (
        <div className='Projects'>
            <div className="header">
                <div className="title">
                    <Palette size="18" />
                    <p>Projects</p>
                </div>
                <div className="btns">
                    {
                        showMenu && projects.length > 0 &&
                        <span className='edit' onClick={ () => setEdit(edit => !edit)}>
                            <PencilFill size="15" color={pencilColor}/>
                        </span>
                    }
                    <AddNewProject />
                    <animated.span
                        className='arrow'
                        onClick={() => setShowMenu(!showMenu)}
                        style={spin}
                    >
                        <CaretUp size="20" />
                    </animated.span>
                </div>
            </div>
            <animated.div style={menuAnimation} className="items">
                {
                    projects.map( project => 
                        <Project
                            project={project}
                            key={project.id}
                            edit={edit}
                        />
                    )
                }
            </animated.div>
        </div>
    )
}

// Exporting the Projects component for use elsewhere in the application.
export default Projects