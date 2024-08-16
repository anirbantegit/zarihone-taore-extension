import { useState } from 'react';
import { userAuthStorage } from '@extension/storage';

const Registration = ({ onRegister }: { onRegister: () => void }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    await userAuthStorage.login(username, email);
    onRegister(); // Notify parent component to proceed to the dashboard
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4">Register</h2>
      <input
        type="text"
        placeholder="Username"
        className="mb-2 p-2 border"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="mb-2 p-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRegister} className="p-2 bg-blue-500 text-white rounded">Register</button>
    </div>
  );
};

export default Registration;
