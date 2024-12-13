import Cookies from 'js-cookie';

const STORAGE_PREFIX = 'teacher_assistant_';
const TOKEN_KEY = `${STORAGE_PREFIX}token`;
const USER_KEY = `${STORAGE_PREFIX}user`;

export const storage = {
  getToken: () => Cookies.get(TOKEN_KEY),
  getUser: () => {
    const user = Cookies.get(USER_KEY);
    if (!user) return null;
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },
  setToken: (token: string) => Cookies.set(TOKEN_KEY, token, { expires: 7 }),
  setUser: (user: any) => Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7 }),
  clearAuth: () => {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USER_KEY);
  }
};