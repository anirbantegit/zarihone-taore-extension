import { useEffect, useState } from 'react';
import { userAuthStorage } from '@extension/storage';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import '@src/Popup.css';

const Popup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    userAuthStorage.isLoggedIn().then(setIsLoggedIn);
  }, []);

  const handleRegister = () => {
    setIsLoggedIn(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!isLoggedIn ? (
          showLogin ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Registration onRegister={handleRegister} />
          )
        ) : (
          <Dashboard />
        )}
        {!isLoggedIn && (
          <button
            className="mt-4 p-2 text-sm text-blue-500 underline"
            onClick={() => setShowLogin((prev) => !prev)}
          >
            {showLogin ? 'Need to Register?' : 'Already Registered? Login'}
          </button>
        )}
      </header>
    </div>
  );
};

export default Popup;
