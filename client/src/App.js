import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import Home from './components/Home/Home';


function App() {
 
  return (
    <div className="App">
       <Router>
         <Routes>
           <Route exact path='/' element={<LoginPage/>}/>
           <Route exact path='/register' element={<RegisterPage/>}/>
           <Route exact path='/home' element={<Home/>}/>
         </Routes>
       </Router>
    </div>
  );
}

export default App;
