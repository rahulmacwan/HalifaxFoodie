
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Registration from './CustomerRegistration/Registration';
import RestaurantRegistration from './RestaurantRegistration/RestaurantRegistration';
import Login from './Login/Login';
import CustomerDashboard from './Dashboards/CustomerDashboard/CustomerDashboard';
import RestaurantDashboard from './Dashboards/RestaurantDashboard/RestaurantDashboard';
import UploadRecipe from './Dashboards/RestaurantDashboard/UploadRecipe';
import ExtractIngredients from './Dashboards/RestaurantDashboard/ExtractIngredients';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path = 'register' element={<Registration/>}/>
      <Route exact path="/RestaurantRegistration1" element={<RestaurantRegistration/>}/>
      <Route exact path="/Login" element={<Login/>}/>      
      <Route exact path="/CustomerDashboard" element={<CustomerDashboard/>}/>
      <Route exact path="/RestaurantDashboard" element={<RestaurantDashboard/>}/>
      <Route exact path="/UploadRecipe" element={<UploadRecipe/>}/>
      <Route exact path="/ExtractIngredients" element={<ExtractIngredients/>}/> 
</Routes>
    </BrowserRouter>
    
  );
}

export default App;
