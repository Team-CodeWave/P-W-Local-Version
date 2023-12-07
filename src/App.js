import './App.css';
import { Routes, Route } from 'react-router-dom';
import EditPage from './pages/EditPage.js';
import ResultPage from './pages/ResultPage.js';
import Spinner from './pages/Spinner.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<EditPage/>}/>
        <Route path='/result' element={<ResultPage/>}/>
        <Route path='/ready' element={<Spinner/>}/>
      </Routes>
    </div>
  );
}

export default App;
