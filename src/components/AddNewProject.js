//Imports
import React, {useState} from 'react'
import Modal from './Modal'
import ProjectForm from './ProjectForm'
import { Plus } from 'react-bootstrap-icons'
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

//Defining the AddNewProject function component.
function AddNewProject(){
    // Initializing state variable 'showModal' to control the visibility of the modal, default is false.
    const [showModal, setShowModal] = useState(false)
    // Initializing state variable 'projectName' to store the name of the project, default is an empty string.
    const [projectName, setProjectName] = useState('')

    //Defining the handleSubmit function which will be triggered on form submission.
    function handleSubmit(e) {
        // Preventing the default form submission behavior.
        e.preventDefault();
        
        // Checking if projectName is not an empty string.
        if (projectName) {
            // Creating a reference to the 'projects' collection in Firestore.
            const projectsRef = collection(db, 'projects');
            // Creating a query to find a project with the same name as the entered projectName.
            const q = query(projectsRef, where('name', '==', projectName));
            
            // Executing the query.
            getDocs(q)
                .then(querySnapshot => {
                    // Checking if the query returned any documents.
                    if (querySnapshot.empty) {
                        // If no existing project is found, add a new project with the entered name to Firestore.
                        addDoc(projectsRef, { name: projectName });
                    } else {
                        // If a project with the same name already exists, alert the user.
                        alert('Project already exists!');
                    }
                });
            // Closing the modal and resetting the projectName state to an empty string.
            setShowModal(false);
            setProjectName('');
        }
    }
    // Render method of the component.
    return (
        // Container div for the AddNewProject component.
        <div className='AddNewProject'>
            <div className="add-button">
                <span onClick={() => setShowModal(true)}>
                    <Plus size="20" />
                </span>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <ProjectForm
                    handleSubmit={handleSubmit}
                    heading='New project!'
                    value={projectName}
                    setValue={setProjectName}
                    setShowModal={setShowModal}
                    confirmButtonText='+ Add Project'
                />
            </Modal>
        </div>
    )
}
// Exporting the AddNewProject component for use in other parts of the application.
export default AddNewProject