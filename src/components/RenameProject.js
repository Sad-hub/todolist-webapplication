// Importing necessary React hooks and components.
import React, {useContext, useState} from 'react'
import ProjectForm from './ProjectForm'
import { db } from '../firebase';
import { TodoContext } from '../context'
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Defining the RenameProject function component.
// It accepts 'project' and 'setShowModal' as props.
function RenameProject({project, setShowModal}){
    // State variable to store the new project name.
    const [newProjectName, setNewProjectName] = useState(project.name)

    // Accessing the TodoContext to get the selectedProject and setSelectedProject function.
    const { selectedProject, setSelectedProject } = useContext(TodoContext)

    // Function to rename the project.
    const renameProject = (project, newProjectName) => {
        // References to the 'projects' and 'todos' collections in Firestore.
        const projectsRef = collection(db, 'projects');
        const todosRef = collection(db, 'todos');

        // Query to check if a project with the new name already exists.
        const q = query(projectsRef, where('name', '==', newProjectName));

        getDocs(q).then(querySnapshot => {
            if (!querySnapshot.empty) {
                // Alert if a project with the same name exists.
                alert('Project with the same name already exists!');
            } else {
                // Reference to the specific project document in Firestore.
                const projectRef = doc(db, 'projects', project.id);

                // Updating the project name in Firestore.
                updateDoc(projectRef, { name: newProjectName })
                    .then(() => {
                        // Query to update all todos associated with the project.
                        const todosQuery = query(todosRef, where('projectName', '==', project.name));
                        getDocs(todosQuery).then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                updateDoc(doc.ref, { projectName: newProjectName });
                            });
                        })
                        .then(() => {
                            // Update the selected project if it was the one being renamed.
                            if (selectedProject === project.name) {
                                setSelectedProject(newProjectName);
                            }
                        });
                    });
            }
        });
    };

    // Function to handle the form submission.
    function handleSubmit(e){
        e.preventDefault() // Preventing the default form submission behavior.
        renameProject(project, newProjectName) // Calling the renameProject function.
        setShowModal(false) // Closing the modal after renaming the project.
    }

     // Render method of the component.
    return (
        <div className='RenameProject'>
            <ProjectForm
                handleSubmit={handleSubmit}
                heading='Edit project name!'
                value={newProjectName}
                setValue={setNewProjectName}
                setShowModal={setShowModal}
                confirmButtonText='Confirm'
            />
        </div>
    )
}

// Exporting the RenameProject component for use elsewhere in the application.
export default RenameProject