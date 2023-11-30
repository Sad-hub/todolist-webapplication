// Importing necessary hooks and libraries from React and other sources.
import React, {useContext, useEffect, useState} from 'react'
import Modal from './Modal'
import TodoForm from './TodoForm'
import { TodoContext } from '../context'
import { calendarItems } from '../constants'
import { db } from '../firebase';
import moment from 'moment'
import randomcolor from 'randomcolor'
import { collection, addDoc } from 'firebase/firestore';

// Defining the AddNewTodo function component.
function AddNewTodo(){
    // Using the useContext hook to access 'projects' and 'selectedProject' from TodoContext.
    const { projects, selectedProject } = useContext(TodoContext)
    
    // Initializing state variables.
    const [showModal, setShowModal] = useState(false) // Controls visibility of the modal.
    const [text, setText] = useState('') // Stores the text of the new todo.
    const [day, setDay] = useState(new Date()) // Stores the selected date for the todo.
    const [time, setTime] = useState(new Date()) // Stores the selected time for the todo.
    const [todoProject, setTodoProject] = useState(selectedProject) // Stores the project associated with the todo.

    // handleSubmit function is called when the todo form is submitted.
    function handleSubmit(e) {
        e.preventDefault(); // Prevents the default form submission action.

        // Checks if text is not empty and the project is not a calendar item.
        if (text && !calendarItems.includes(todoProject)) {
            // Adds a new document to the 'todos' collection in Firestore with the todo details.
            addDoc(collection(db, 'todos'), {
                text: text,
                date: moment(day).format('MM/DD/YYYY'), // Formats the date using moment.
                day: moment(day).format('d'), // Formats the day using moment.
                time: moment(time).format('hh:mm A'), // Formats the time using moment.
                checked: false, // Sets the initial checked state to false.
                color: randomcolor({ luminosity: 'dark' }), // Generates a random dark color.
                projectName: todoProject // Sets the project name.
            });
    
            // Resets the state variables and closes the modal after submission.
            setShowModal(false);
            setText('');
            setDay(new Date());
            setTime(new Date());
        }
    }

    // useEffect hook to update todoProject when selectedProject changes.
    useEffect( () => {
        setTodoProject(selectedProject)
    }, [selectedProject])

    // Render method of the component.
    return (
        // Container div for the AddNewTodo component.
        <div className='AddNewTodo'>
            <div className="btn">
                <button onClick={() => setShowModal(true)}>
                    + New Todo
                </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <TodoForm
                    handleSubmit={handleSubmit}
                    heading='Add new to do!'
                    text={text}
                    setText={setText}
                    day={day}
                    setDay={setDay}
                    time={time}
                    setTime={setTime}
                    todoProject={todoProject}
                    setTodoProject={setTodoProject}
                    projects={projects}
                    showButtons={true}
                    setShowModal={setShowModal}
                />
            </Modal>
        </div>
    )
}
// Exporting the AddNewTodo component for use elsewhere in the application.
export default AddNewTodo