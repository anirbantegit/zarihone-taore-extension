import { useState } from 'react';
import { userAuthStorage } from '@extension/storage';

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    const userData = await userAuthStorage.get();
    if (userData.email === email) {
      onLogin(); // Notify parent component to proceed to the dashboard
    } else {
      alert('Invalid email');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="mb-2 p-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded">Login</button>
    </div>
  );
};

export default Login;
