// Importing necessary React hooks and context API.
import React, { createContext, useState } from 'react'
// Importing custom hooks for managing todos and projects.
import { useTodos, useProjects, useFilterTodos, useProjectsWithStats } from '../hooks'

// Creating a new context for the Todo application.
const TodoContext = createContext()

// Defining the TodoContextProvider function component.
function TodoContextProvider({children}){
    // Default project is set to 'today'.
    const defaultProject = 'today'
    // State for tracking the currently selected project.
    const [selectedProject, setSelectedProject] = useState(defaultProject)
    // State for tracking the currently selected todo item.
    const [selectedTodo, setSelectedTodo] = useState(undefined)

    // Using custom hooks to fetch and manage todos and projects data.
    const todos = useTodos() // Fetches all todos.
    const projects = useProjects() // Fetches all projects.
    const projectsWithStats = useProjectsWithStats(projects, todos) // Fetches projects with additional statistics.
    const filteredTodos = useFilterTodos(todos, selectedProject) // Fetches todos filtered by the selected project.

    // Render method of the component.
    return (
        // Providing the context to the child components.
        <TodoContext.Provider
            value={
                {
                    defaultProject,
                    selectedProject,
                    setSelectedProject,
                    todos : filteredTodos,
                    projects : projectsWithStats,
                    selectedTodo,
                    setSelectedTodo
                }
            }
        >
            {children}
        </TodoContext.Provider>
    )
}

// Exporting the TodoContextProvider and TodoContext for use in other components.
export { TodoContextProvider, TodoContext }