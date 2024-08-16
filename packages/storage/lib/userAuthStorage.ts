import { createStorage, StorageType, BaseStorage } from './base';

type UserData = {
  username: string;
  email: string;
  isLoggedIn: boolean;
};

const userStorage = createStorage<UserData>('user-storage-key', { username: '', email: '', isLoggedIn: false }, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const userAuthStorage = {
  ...userStorage,
  login: async (username: string, email: string) => {
    await userStorage.set({ username, email, isLoggedIn: true });
  },
  logout: async () => {
    await userStorage.set({ username: '', email: '', isLoggedIn: false });
  },
  isLoggedIn: async () => {
    const data = await userStorage.get();
    return data.isLoggedIn;
  }
};
