// Importing necessary modules and components.
import moment from 'moment'
import React, {useContext, useState} from 'react'
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons'
import { db } from '../firebase';
import { TodoContext } from '../context'
import { useSpring, useTransition, animated } from 'react-spring'
import { doc, deleteDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

// Defining the Todo function component.
// It accepts a 'todo' object as a prop.
function Todo({todo}){
    // State to manage hover effects.
    const [hover, setHover] = useState(false)

    // Accessing the TodoContext.
    const { selectedTodo, setSelectedTodo } = useContext(TodoContext)

    // Function to delete a todo.
    const deleteTodo = todo => {
        deleteDoc(doc(db, 'todos', todo.id));
    };

    // Function to toggle the checked status of a todo.
    const checkTodo = todo => {
        const todoRef = doc(db, 'todos', todo.id);
        updateDoc(todoRef, { checked: !todo.checked });
    };
    
    // Function to repeat a todo for the next day.
    const repeatNextDay = todo => {
        const nextDayDate = moment(todo.date, 'MM/DD/YYYY').add(1, 'days');
    
        // Creating a new todo object for the next day.
        const repeatedTodo = {
            ...todo,
            date: nextDayDate.format('MM/DD/YYYY'),
            day: nextDayDate.format('d'),
            checked: false
        };
    
        // Removing the id from the repeated todo.
        delete repeatedTodo.id;
    
        // Adding the repeated todo to Firestore.
        addDoc(collection(db, 'todos'), repeatedTodo);
    };

    // Function to handle the deletion of a todo.
    const handleDelete = (todo) => {
        deleteTodo(todo)
        if(selectedTodo === todo){ 
            setSelectedTodo(false)
        }
    }

    // Animation for the todo item.
    const fadeIn = useSpring({
        from : { marginTop : '-12px', opacity : 0 },
        to : { marginTop : '0px', opacity : 1}
    })

    // Transition animations for the check/uncheck icon.
    const checkTransitions = useTransition(todo.checked, {
        from : { position : 'absolute', transform : 'scale(0)' },
        enter : { transform : 'scale(1)' },
        leave : { transform : 'scale(0)' }
    })

    // Render method of the component.
    return (
        <animated.div style={fadeIn} className='Todo'>
            <div
                className="todo-container"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div
                    className="check-todo"
                    onClick={ () => checkTodo(todo) }
                >
                    {
                        checkTransitions((props, checked) => 
                            checked ?
                            <animated.span style={props} className="checked">
                                <CheckCircleFill color="#bebebe" />
                            </animated.span>
                            :
                            <animated.span style={props} className="unchecked">
                                <Circle color={todo.color} />
                            </animated.span>
                        )
                    }
                </div>
                <div
                    className="text"
                    onClick={ () => setSelectedTodo(todo)}
                >
                    <p style={{color : todo.checked ? '#bebebe' : '#000000'}}>{todo.text}</p>
                    <span>{todo.time} - {todo.projectName}</span>
                    <div className={`line ${todo.checked ? 'line-through' : ''}`}></div>
                </div>
                <div
                    className="add-to-next-day"
                    onClick={() => repeatNextDay(todo)}
                >
                    {
                        todo.checked &&
                        <span>
                            <ArrowClockwise />
                        </span>
                    }
                </div>
                <div
                    className="delete-todo"
                    onClick={ () => handleDelete(todo)}
                >
                    {
                        (hover || todo.checked) &&
                        <span>
                            <Trash />
                        </span>
                    }
                </div>
            </div>
        </animated.div>
    )
}

// Exporting the Todo component for use elsewhere in the application.
export default Todo