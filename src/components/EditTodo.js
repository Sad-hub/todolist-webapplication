// Importing necessary React hooks and other modules.
import React, {useContext, useEffect, useState} from 'react'
import TodoForm from './TodoForm'
import { TodoContext } from '../context'
import moment from 'moment'
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

// Defining the EditTodo function component.
function EditTodo(){
    // Initializing state variables to store todo details.
    const [text, setText] = useState('') // Text of the todo.
    const [day, setDay] = useState(new Date()) // Date for the todo.
    const [time, setTime] = useState(new Date()) // Time for the todo.
    const [todoProject, setTodoProject] = useState('') // Associated project for the todo.

    // Accessing the TodoContext to get the selectedTodo and projects.
    const { selectedTodo, projects } = useContext(TodoContext)

    // useEffect hook to populate state variables when selectedTodo changes.
    useEffect(() => {
        if (selectedTodo) {
            setText(selectedTodo.text); // Sets the text from the selected todo.

            // Parsing and validating the date and time from selectedTodo.
            const formattedDay = selectedTodo.date ? moment(selectedTodo.date, 'MM/DD/YYYY') : moment();
            const formattedTime = selectedTodo.time ? moment(selectedTodo.time, 'hh:mm A') : moment();
            
            // Setting day and time using valid moment objects or default to new Date.
            setDay(formattedDay.isValid() ? formattedDay.toDate() : new Date());
            setTime(formattedTime.isValid() ? formattedTime.toDate() : new Date());
            
            // Setting the project name from selectedTodo.
            setTodoProject(selectedTodo.projectName);
        }
    }, [selectedTodo]);
    
    // Second useEffect hook to update the todo in Firestore when any of the dependencies change.
    useEffect(() => {
        if (selectedTodo) {
            // Reference to the specific todo document in Firestore.
            const todoRef = doc(db, 'todos', selectedTodo.id);

            // Updating the document in Firestore with new values.
            updateDoc(todoRef, {
                text,
                date: moment(day).format('MM/DD/YYYY'),
                day: moment(day).format('d'),
                time: moment(time).format('hh:mm A'),
                projectName: todoProject
            })
            .then(() => {
                // Handle successful update, for instance, showing a confirmation message.
            })
            .catch((error) => {
                // Handle any errors, for example, showing an error message.
            });
        }
    }, [selectedTodo, text, day, time, todoProject]);

    // handleSubmit function to handle form submission.
    function handleSubmit(e) {
        e.preventDefault();  // Preventing default form submission behavior.
    
        if (selectedTodo) {
            // Reference to the specific todo document in Firestore.
            const todoRef = doc(db, 'todos', selectedTodo.id);

            // Updating the document in Firestore with new values.
            updateDoc(todoRef, {
                text,
                date: moment(day).format('MM/DD/YYYY'),
                day: moment(day).format('d'),
                time: moment(time).format('hh:mm A'),
                projectName: todoProject
            })
            .then(() => {
                // Handle successful update, such as displaying a confirmation message.
            })
            .catch((error) => {
                // Handle any errors, like showing an error message.
            });
        }
    }

    // Render method of the component.
    return (
        <div>
            {selectedTodo && (
                <div className='EditTodo'>
                    <div className="header">Edit Todo</div>
                    <div className="container">
                        <TodoForm
                            handleSubmit={handleSubmit}
                            text={text}
                            setText={setText}
                            day={day}
                            setDay={setDay}
                            time={time}
                            setTime={setTime}
                            todoProject={todoProject}
                            setTodoProject={setTodoProject}
                            projects={projects}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

// Exporting the EditTodo component for use elsewhere in the application.
export default EditTodo