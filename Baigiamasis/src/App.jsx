import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UsersContext from './contexts/UsersContext';
import Home from './components/pages/Home';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';


const App = () => {

  const { loggedInUser } = useContext(UsersContext);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/cards'>

            /
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;