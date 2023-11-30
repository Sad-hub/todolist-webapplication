// Importing necessary hooks and components from React, Bootstrap icons, and other libraries.
import React, { useContext, useState } from 'react'
import { CalendarDate, CaretUp } from 'react-bootstrap-icons'
import { calendarItems } from '../constants'
import { TodoContext } from '../context'
import { useSpring, animated } from 'react-spring'

// Defining the Calendar function component.
function Calendar(){
    // Initializing a state variable 'showMenu' to control the visibility of the calendar menu.
    const [showMenu, setShowMenu] = useState(true)

    // Using the useContext hook to access the 'setSelectedProject' function from TodoContext.
    const { setSelectedProject } = useContext(TodoContext)
    
    // Defining the animation for the CaretUp icon using react-spring.
    // This animation will rotate the icon based on the state of 'showMenu'.
    const spin = useSpring({
        transform : showMenu ? 'rotate(0deg)' : 'rotate(180deg)',
        config : { friction : 10 }
    })

    // Defining the animation for the menu using react-spring.
    // This animation will toggle the display and line height of the menu based on 'showMenu'.
    const menuAnimation = useSpring({
        display : showMenu ? 'block' : 'none',
        lineHeight : showMenu ? 1.2 : 0
    })

    // Render method of the component.
    return (
         // Main container div for the Calendar component.
        <div className='Calendar'>
            <div className="header">
                <div className="title">
                    <CalendarDate size="18"/>
                    <p>Calendar</p>
                </div>
                <animated.div
                    style={spin}
                    onClick={() => setShowMenu(!showMenu)}
                    className="btns"
                >
                    <span>
                        <CaretUp size="20" />
                    </span>
                </animated.div>
            </div>
            <animated.div style={menuAnimation} className="items">
                {
                    calendarItems.map( item => 
                        <div
                            className="item"
                            key={item}
                            onClick={ () => setSelectedProject(item)}
                        >
                            {item}
                        </div>
                    )
                }
            </animated.div>
        </div>
    )
}
// Exporting the Calendar component for use elsewhere in the application.
export default Calendar 