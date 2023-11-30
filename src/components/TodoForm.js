// Importing necessary React components and icons.
import React from 'react';
import { Bell, CalendarDay, Clock, Palette, X } from 'react-bootstrap-icons';
// Importing DatePicker and TimePicker components from MUI.
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
// Importing AdapterDateFns for date handling in MUI components.
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// Importing LocalizationProvider from MUI for localizing the date pickers.
import { LocalizationProvider } from '@mui/x-date-pickers';

// Defining the TodoForm function component with its props.
function TodoForm({
    handleSubmit,
    heading = false,
    text, setText,
    day, setDay,
    time, setTime,
    todoProject, setTodoProject,
    projects,
    showButtons = false,
    setShowModal = false
}){

    // Render method of the component.
    return (
         // Providing a date adapter for the date and time pickers.
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmit} className='TodoForm'>
                <div className="text">
                    {
                        heading && 
                        <h3>{heading}</h3>
                    }
                    <input
                        type='text'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder='To do ...'
                        autoFocus
                    />
                </div>
                <div className="remind">
                    <Bell />
                    <p>Remind Me!</p>
                </div>
                <div className="pick-day">
                    <div className="title">
                        <CalendarDay />
                        <p>Choose a day</p>
                    </div>
                    <DatePicker
                        value={day}
                        onChange={day => setDay(day)}
                    />
                </div>
                <div className="pick-time">
                    <div className="title">
                        <Clock />
                        <p>Choose time</p>
                    </div>
                    <TimePicker
                        value={time}
                        onChange={time => setTime(time)}
                    />
                </div>
                <div className="pick-project">
                    <div className="title">
                        <Palette />
                        <p>Choose a project</p>
                    </div>
                    <div className="projects">
                        {
                            projects.length > 0 ?
                            projects.map( project => 
                                <div
                                    className={`project ${todoProject === project.name ? "active" : ""}`}
                                    onClick={() => setTodoProject(project.name)}
                                    key={project.id}
                                >
                                    {project.name}
                                </div>    
                            )
                            :
                            <div style={{color:'#ff0000'}}>
                                Please add a project before proceeding
                            </div>
                        }
                    </div>
                </div>
                {
                    showButtons &&
                    <div>
                        <div className="cancel" onClick={() => setShowModal(false)}>
                            <X size='40' />
                        </div>
                        <div className="confirm">
                            <button>+ Add to do</button>
                        </div>
                    </div>
                }
            </form>
        </LocalizationProvider>
    )
}

// Exporting TodoForm for use elsewhere in the application.
export default TodoForm