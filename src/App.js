// Importing the main stylesheet for the application.
import './App.css';
// Importing various components to be used in the application.
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import User from './components/User'
import AddNewTodo from './components/AddNewTodo'
import Calender from './components/Calendar'
import Projects from './components/Projects'
import Todos from './components/Todos'
import EditTodo from './components/EditTodo'

// Function component App definition.
function App() {
  return (
    // A div with a class name "App" that acts as the main container.
    <div className="App">
      <Sidebar>
        <User />
        <AddNewTodo />
        <Calender />
        <Projects />
      </Sidebar>
      <Main>
        <Todos />
        <EditTodo />
      </Main>
    </div>
  );
}

// Exporting App to be used as the root component in the application.
export default App;

