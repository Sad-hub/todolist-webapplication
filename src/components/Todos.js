// Importing necessary React hooks and components.
import React, {useContext} from 'react'
import Todo from './Todo'
import Next7Days from './Next7Days'
import { TodoContext } from '../context'

// Defining the Todos function component.
function Todos(){
    // Accessing the todos and selectedProject from the TodoContext.
    const { todos, selectedProject } = useContext(TodoContext)

    // Render method of the component.
    return (
        // Main container for the Todos component.
        <div className='Todos'>
            <div className='selected-project'>
                {selectedProject}
            </div>
            <div className="todos">
            {
                selectedProject === "next 7 days" ?
                <Next7Days todos={todos} />
                :
                todos.map( todo => 
                    <Todo todo={todo} key={todo.id} />    
                )
            }
            </div>
        </div>
    )
}

// Exporting the Todos component for use elsewhere in the application.
export default Todos