// Importing necessary modules from React and ReactDOM.
import React from 'react';
import reactDom from 'react-dom'
import App from './App';
import { TodoContextProvider } from './context'

// Rendering the application to the DOM.
reactDom.render(
  // Wrapping the App component within the TodoContextProvider.
  // This allows the entire app to have access to the context provided by TodoContextProvider.
  <TodoContextProvider>
    <App/>
  </TodoContextProvider>
  // Targeting the DOM element with the ID 'root'.
  // This is typically the main entry point for a React application in the HTML.
  , document.getElementById('root')
)
