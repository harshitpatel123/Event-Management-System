import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Home from './pages/Home'
import Product from './pages/Product';
import Form from './pages/Form';
import PlannerList from './pages/Planner/PlannerList';
import PlannerForm from './pages/Planner/PlannerForm';
import ViewUserProfile from './pages/User/ViewUserProfile';
import SignIn from './pages/SignIn';
import ViewPlanner from './pages/Planner/ViewPlanner';
import EventList from './pages/Event/EventList';
import EventForm from './pages/Event/EventForm';
import ViewEvent from './pages/Event/ViewEvent';


function App() {

  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {

    const userId = localStorage.getItem('user_id');
    console.log('user id', userId)
    if (userId) {
      setisAuthenticated(true); // User is authenticated
    } else {
      setisAuthenticated(false); // User is not authenticated
    }
  }, [isAuthenticated]);



  return (
    <>
      {/* routing setup */}

      <Router>
        <div>
          <Routes>

            {isAuthenticated ?
              <>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/home" element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/form" element={<Form />} />
                <Route path="/planner" element={<PlannerList />} />
                <Route path="/planner/add/" element={<PlannerForm method='POST' />} />
                <Route path="/planner/update/:id" element={<PlannerForm method='PUT' />} />
                <Route path="/planner/view/:id" element={<ViewPlanner />} />
                <Route path="/event" element={<EventList />} />
                <Route path="/event/add/" element={<EventForm method='POST' />} />
                <Route path="/event/update/:id" element={<EventForm method='PUT' />} />
                <Route path="/event/view/:id" element={<ViewEvent />} />
                <Route path="/user/:id" element={<ViewUserProfile />} />
                <Route path="*" element={<Home />} />
              </>
              :
              <>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<SignIn />} />
              </>

            }
          </Routes>
        </div>
      </Router >
    </>
  );
}

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/home" element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/form" element={<Form />} />
                <Route path="/planner" element={<PlannerList />} />
                <Route path="/planner/add/" element={<PlannerForm method='POST' />} />
                <Route path="/planner/update/:id" element={<PlannerForm method='PUT' />} />
                <Route path="/planner/view/:id" element={<ViewPlanner />} />
                <Route path="/event" element={<EventList />} />
                <Route path="/event/add/" element={<EventForm method='POST' />} />
                <Route path="/event/update/:id" element={<EventForm method='PUT' />} />
                <Route path="/event/view/:id" element={<ViewEvent />} />
                <Route path="/user" element={<ViewUserProfile />} />
                <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;