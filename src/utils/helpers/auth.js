import Cookies from 'js-cookie';

export const auth = {
  setLogin: (data) => {
    Cookies.set('loginId', data.id);
    Cookies.set('loginLevel', data.level);
  },
  isAuthenticated: () => {
    const loginId = Cookies.get('loginId');
    const loginLevel = Cookies.get('loginLevel');
    if (loginId && loginLevel) {
      return true;
    }
    return false;
  },
  isAdmin: () => {
    const loginId = Cookies.get('loginId');
    const loginLevel = Cookies.get('loginLevel');
    if (loginId) {
      if (loginLevel === 'admin') {
        return true;
      }
    }
    return false;
  },
  getUserId: () => {
    return Cookies.get('loginId');
  },
  logout: (navigate) => {
    Cookies.remove('loginId');
    Cookies.remove('loginLevel');
    navigate('/login');
  },
};
