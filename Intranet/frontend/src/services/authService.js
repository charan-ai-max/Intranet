const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const authService = {
  login(data) {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  getRole() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role;
  },

  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  }
};
