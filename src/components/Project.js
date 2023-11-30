// Importing necessary React hooks, components, and icons.
import React, {useContext, useState} from 'react'
import { Pencil, XCircle } from 'react-bootstrap-icons'
import Modal from './Modal'
import RenameProject from './RenameProject'
import { TodoContext } from '../context'
import { db } from '../firebase';
import { useTransition, useSpring, animated } from 'react-spring'
import { doc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Defining the Project function component.
// It accepts 'project' and 'edit' as props.
function Project({project, edit}){
    // Accessing context to get project-related data.
    const { defaultProject, selectedProject, setSelectedProject } = useContext(TodoContext)

    // State for controlling the visibility of the modal.
    const [showModal, setShowModal] = useState(false)

    // Function for deleting a project.
    const deleteProject = project => {
        // Reference to the project document in Firestore.
        const projectRef = doc(db, 'projects', project.id);
        deleteDoc(projectRef)
            .then(() => {
                // Query to find all todos associated with the project.
                const q = query(collection(db, 'todos'), where('projectName', '==', project.name));
    
                // Deleting each todo document associated with the project.
                getDocs(q)
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            deleteDoc(doc.ref);
                        });
                    });
            })
            .then(() => {
                // Update the selected project to default if the deleted project was selected.
                if (selectedProject === project.name) {
                    setSelectedProject(defaultProject);
                }
            })
            .catch((error) => {
                // Error handling goes here.
            });
    };
    
    // Animation for the project component.
    const fadeIn = useSpring({
        from : { marginTop : '-12px', opacity : 0 },
        to : { marginTop : '0px', opacity : 1}
    })

    // Transition animation for edit and delete buttons.
    const btnTransitions = useTransition(edit, {
        from : { opacity : 0, right : '-20px' },
        enter : { opacity : 1, right : '0px' },
        leave : { opacity : 0, right : '-20px' }
    })

    // Render method of the component.
    return (
        <animated.div style={fadeIn} className='Project'>
            <div
                className="name"
                onClick={ () => setSelectedProject(project.name)}
            >
                {project.name}
            </div>
            <div className="btns">
                {
                    btnTransitions((props, editProject) => 
                        editProject ?
                        <animated.div style={props} className="edit-delete">
                            <span
                                className="edit"
                                onClick={ () => setShowModal(true)}
                            >
                                <Pencil size="13" />
                            </span>
                            <span
                                className="delete"
                                onClick={ () => deleteProject(project)}
                            >
                                <XCircle size="13" />
                            </span>
                        </animated.div>
                        :
                        project.numOfTodos === 0 ?
                        ""
                        :
                        <animated.div style={props} className="total-todos">
                            {project.numOfTodos}
                        </animated.div>
                    )
                }
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <RenameProject project={project} setShowModal={setShowModal}/>
            </Modal>
        </animated.div>
    )
}

// Exporting the Project component for use elsewhere in the application.
export default Project