import Navbar from './component/Navbar';  
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './component/Home';
import About from './component/About';
import NoteSate from './context/NoteState';
import Alert from './component/Alert';
const App = ()=> {
  return (
    <>
    <NoteSate>
      <Router>
        <Navbar/>
        <Alert  message = "good app"/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/About" element={<About/> }></Route>
          {/* <Route exact path="/business" element={<News key="business" pageSize={6} category="business"   apikey={apiKey} /> }></Route>
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={6} category="entertainment"   apikey={apiKey} /> }></Route>
          <Route exact path="/health" element={<News key="health" pageSize={6} category="health"   apikey={apiKey} /> }></Route>
          <Route exact path="/science" element={<News key="science" pageSize={6} category="science"   apikey={apiKey} /> }></Route>
          <Route exact path="/sports" element={<News key="sports" pageSize={6} category="sports"   apikey={apiKey} /> }></Route>
          <Route exact path="/technology" element={<News key="technology" pageSize={6} category="technology"  apikey={apiKey}/>}></Route> */}
        </Routes>
        </div>
        </Router>
        </NoteSate>
    </>
  );
}

export default App;
