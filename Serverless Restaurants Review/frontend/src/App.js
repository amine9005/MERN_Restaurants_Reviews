import { Routes,Route } from 'react-router-dom';
import './App.scss';
import AddReview from './components/AddReview';
import Layout from './components/Layout';
import Home from './components/Home';
import RestaurantView from './components/RestaurantView';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index='/' element={<Home/>}/>
          <Route path='/add' element={<AddReview/>}/>
          <Route path='/view/:id' element={<RestaurantView/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
