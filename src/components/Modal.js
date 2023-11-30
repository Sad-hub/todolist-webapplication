// Importing necessary hooks and libraries from React and react-spring.
import React, {useRef} from 'react'
import { useSpring, animated } from 'react-spring'

// Defining the Modal function component.
// It accepts three props: 'children', 'showModal', and 'setShowModal'.
function Modal({children, showModal, setShowModal}){
    // Creating a ref object to reference the modal element.
    const modalRef = useRef()

    // Function to close the modal when clicking outside of its container.
    const closeModal = (e) => {
        // Checks if the clicked element is the modal background.
        if(e.target === modalRef.current){
            // Calls setShowModal to update the state and close the modal.
            setShowModal(false)
        }
    }

    // Defining the animation for the modal using react-spring.
    // This will animate the opacity and the top position of the modal.
    const modalAnimation = useSpring({
        opacity : showModal ? 1 : 0, // Animates opacity based on the showModal state.
        top : showModal ? '25%' : '0%', // Animates vertical position.
        config : { friction : 10 } // Configures the animation's friction for a natural feel.
    })
    
    // Render method of the component.
    return (
        // Conditional rendering of the modal based on the showModal prop.
        showModal &&
        <div className="Modal" ref={modalRef} onClick={closeModal}>
            <animated.div style={modalAnimation} className="container">
                {children}
            </animated.div>
        </div>
    )
}

// Exporting the Modal component for use elsewhere in the application.
export default Modal