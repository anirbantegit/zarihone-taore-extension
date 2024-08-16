import { useState, useEffect } from 'react';
import { userSizePreferencesStorage } from '@extension/storage';

const Dashboard = () => {
  const [sizes, setSizes] = useState({ shirt: 'M', shoes: 'M', pant: 'M' });

  useEffect(() => {
    // Load existing preferences from storage
    userSizePreferencesStorage.get().then(setSizes);
  }, []);

  const handleSizeChange = async (category: keyof typeof sizes, size: 'S' | 'M' | 'L') => {
    const newSizes = { ...sizes, [category]: size };
    setSizes(newSizes);

    // Update the size in storage
    if (category === 'shirt') {
      await userSizePreferencesStorage.updateShirtSize(size);
    } else if (category === 'shoes') {
      await userSizePreferencesStorage.updateShoesSize(size);
    } else if (category === 'pant') {
      await userSizePreferencesStorage.updatePantSize(size);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4">Select Your Sizes</h2>
      {['shirt', 'shoes', 'pant'].map((category) => (
        <div key={category} className="mb-4">
          <label className="block mb-2 capitalize">{category}</label>
          <select
            value={sizes[category as keyof typeof sizes]}
            onChange={(e) => handleSizeChange(category as keyof typeof sizes, e.target.value as 'S' | 'M' | 'L')}
            className="p-2 border"
          >
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
