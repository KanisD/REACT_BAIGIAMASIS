import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UsersContext from './contexts/UsersContext';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import UserPage from './components/pages/UserPage';
import AdminPanel from './components/pages/AdminPanel';

const App = () => {

  const { loggedInUser } = useContext(UsersContext);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/cards'>
          </Route>
          <Route path='/user'>
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
            <Route path=":name" element={
              loggedInUser ? <UserPage /> : <Navigate to='/user/login' />
            }/>
            <Route path="adminPanel" element={
              loggedInUser.role === 'admin' ? <AdminPanel /> : <Navigate to='/user/login' />
            }/>
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;