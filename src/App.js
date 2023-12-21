import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './componenets/Navbar';
import Home from './componenets/Home';
import About from './componenets/About';
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Routes>
    <Route exact path='/' element={<Home/>} />
    <Route exact path='/about' element={<About/>}/>
    </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
