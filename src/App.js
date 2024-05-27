import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import AddResource from './components/AddResource/AddResource.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
				<Route path='/' element={<Home />} />
        <Route path='/add-resource' element={<AddResource />} />
			</Routes>

    </div>
  );
}

export default App;
