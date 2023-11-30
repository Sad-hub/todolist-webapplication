// Importing React.
import React from 'react'

// Defining the ProjectForm function component.
// It receives several props: handleSubmit, heading, value, setValue, setShowModal, and confirmButtonText.
function ProjectForm({handleSubmit, heading, value, setValue, setShowModal, confirmButtonText}){

    // Render method of the component.
    return (
        // A form element with an onSubmit event handler.
        <form onSubmit={handleSubmit} className='ProjectForm'>
            <h3>{heading}</h3>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type='text'
                placeholder='project name...'
                autoFocus
            />
            <button className='cancel' role='button' onClick={() => setShowModal(false)}>
                cancel
            </button>
            <button className="confirm">
                {confirmButtonText}
            </button>
        </form>
    )
}

// Exporting the ProjectForm component for use elsewhere in the application.
export default ProjectForm