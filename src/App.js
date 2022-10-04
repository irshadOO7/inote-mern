import Navbar from './component/Navbar';  
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './component/Home';
import About from './component/About';
import Login from './component/Login';
import Singup from './component/Singup';
import NoteSate from './context/NoteState';
import Alert from './component/Alert';
import { useState } from 'react';
const App = ()=> {
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) =>{
    setAlert({
      msg:msg,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <NoteSate>
      <Router>
        <Navbar/>
        <Alert  alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
          <Route exact path="/About" element={<About/> }></Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/> }></Route>
          <Route exact path="/singup" element={<Singup showAlert={showAlert}/> }></Route>
          </Routes>
        </div>
        </Router>
        </NoteSate>
    </>
  );
}

export default App;
