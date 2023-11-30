// Importing necessary modules and hooks.
import moment from 'moment'
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query } from "firebase/firestore"; 

// A custom hook to fetch and listen for real-time updates on todos from Firestore.
export function useTodos(){
    const [todos, setTodos] = useState([]) // State to hold todo items.

    useEffect(() => {
        // Establishing a real-time subscription to the 'todos' collection in Firestore.
        const unsubscribe = onSnapshot(collection(db, 'todos'), snapshot => {
            // Mapping over the snapshot to transform the data into the desired format.
            const data = snapshot.docs.map(doc => ({
                id: doc.id, // Getting document id.
                ...doc.data() // Spreading all other data from the document.
            }));
            setTodos(data); // Updating the state with the new todos data.
        });

        // Returning a cleanup function to unsubscribe from the listener when the component unmounts.
        return () => unsubscribe();
    }, []); // Empty dependency array to run the effect once on mount.


    return todos; // Returning the todos array for use in components.
}

// A custom hook to filter todos based on a selected project.
export function useFilterTodos(todos, selectedProject){
    const [filteredTodos, setFilteredTodos] = useState([]) // State to hold the filtered todos.

    useEffect( () => {
        let data; // Variable to hold the filtered data.
        const todayDateFormated = moment().format('MM/DD/YYYY') // Formatting today's date.

        // Filtering logic based on the selected project.
        if(selectedProject === 'today'){
            data = todos.filter(todo => todo.date === todayDateFormated); // Filtering for today's todos.
        }else if(selectedProject === 'next 7 days'){
            data = todos.filter(todo => {
                const todoDate = moment(todo.date, 'MM/DD/YYYY');
                const todayDate = moment(todayDateFormated, 'MM/DD/YYYY');
                const diffDays = todoDate.diff(todayDate, 'days');
                return diffDays >=0 && diffDays < 7; // Filtering for the next 7 days.
            });

        }else if( selectedProject === 'all days'){
            data = todos // No filtering, all todos are returned.
        }else{
            data = todos.filter(todo => todo.projectName === selectedProject); // Filtering by specific project.
        }

        setFilteredTodos(data); // Updating the state with the filtered todos.
    }, [todos, selectedProject]); // Dependency array: effect runs when todos or selectedProject changes.

    return filteredTodos; // Returning the filtered todos array for use in components.
}

// A custom hook to fetch and listen for real-time updates on projects from Firestore.
export function useProjects(){
    const [projects, setProjects] = useState([]) // State to hold project items.

    useEffect(() => {
        // Establishing a real-time subscription to the 'projects' collection in Firestore.
        const unsubscribe = onSnapshot(collection(db, 'projects'), snapshot => {
            // Mapping over the snapshot to transform the data into the desired format.
            const data = snapshot.docs.map(doc => ({
                id: doc.id, // Getting document id.
                name: doc.data().name // Getting the name field from the document.
            }));
            setProjects(data); // Updating the state with the new projects data.
        });

         // Returning a cleanup function to unsubscribe from the listener when the component unmounts.
        return () => unsubscribe(); // Empty dependency array to run the effect once on mount.
    }, []);

    return projects; // Returning the projects array for use in components.
}

// A custom hook to calculate statistics for projects based on todos.
export function useProjectsWithStats(projects, todos){
    const [projectsWithStats, setProjectsWithStats] = useState([]) // State to hold projects with additional stats.

    useEffect(() => {
        // Calculating the number of todos for each project.
        const data = projects.map((project) => {
            return {
                numOfTodos : todos.filter( todo => todo.projectName === project.name && !todo.checked).length,
                ...project // Spreading the rest of the project data.
            }
        })

        setProjectsWithStats(data); // Updating the state with the new projects data including stats.
    }, [projects, todos]); // Dependency array: effect runs when projects or todos change.

    return projectsWithStats; // Returning the projects array with stats for use in components.
}
