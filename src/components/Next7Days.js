// Importing necessary modules.
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Todo from './Todo' // Importing the Todo component.

// Defining the Next7Days function component.
// It accepts a 'todos' prop which is an array of todo items.
function Next7Days({ todos }) {
    // State to store todos organized by day for the week.
    const [weekTodos, setWeekTodos] = useState([])

    // useEffect hook to organize and set todos for the week whenever the todos prop changes.
    useEffect(() => {
        // Array representing days of the week as strings.
        const days = ['0', '1', '2', '3', '4', '5', '6']

        // Sorting todos by day.
        const sortedTodosByDay = days.map(day => {
            return {
                todos: todos.filter(todo => todo.day === day), // Filtering todos for each day.
                number: day // The day number.
            }
        })

        // Getting today's day number using moment.js.
        const today = parseInt(moment().format('d'))

        // Arranging the days so that today's day comes first followed by the next days.
        const arrangeDays = sortedTodosByDay.slice(today).concat(sortedTodosByDay.slice(0, today))

        // Setting the arranged todos in the weekTodos state.
        setWeekTodos(arrangeDays)
    }, [todos]) // Dependency array includes todos, so the effect runs whenever todos changes.

    // Render method of the component.
    return (
        <div className='Next7Days'>
            {
                weekTodos.map(day =>
                    <div key={day.number}>
                        <div className='day'>
                            <div className='name'>
                                {moment(day.number, 'd').format('dddd')}
                                {day.number === moment().format('d') && ' (Today)'}
                            </div>
                            <div className='total-todos'>
                                ({day.todos.length})
                            </div>
                        </div>
                        <div className='todos'>
                            {
                                day.todos.map(todo =>
                                    <Todo key={todo.id} todo={todo} />
                                )
                            }
                        </div>
                    </div>

                )
            }
        </div>
    )
}

// Exporting the Next7Days component for use elsewhere in the application.
export default Next7Days