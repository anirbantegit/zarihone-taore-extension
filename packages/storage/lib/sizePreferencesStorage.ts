import { createStorage, StorageType, BaseStorage } from './base';

type SizePreferences = {
  shirt: 'S' | 'M' | 'L';
  shoes: 'S' | 'M' | 'L';
  pant: 'S' | 'M' | 'L';
};

const sizePreferencesStorage = createStorage<SizePreferences>('size-preferences-storage-key', {
  shirt: 'M',
  shoes: 'M',
  pant: 'M'
}, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const userSizePreferencesStorage = {
  ...sizePreferencesStorage,
  updateShirtSize: async (size: 'S' | 'M' | 'L') => {
    await sizePreferencesStorage.set(current => ({ ...current, shirt: size }));
  },
  updateShoesSize: async (size: 'S' | 'M' | 'L') => {
    await sizePreferencesStorage.set(current => ({ ...current, shoes: size }));
  },
  updatePantSize: async (size: 'S' | 'M' | 'L') => {
    await sizePreferencesStorage.set(current => ({ ...current, pant: size }));
  }
};
