//  add JSON Web Tokens (JWT), requires npm install jwt-decode
import decode from 'jwt-decode';


//  adding JWT authentication
class AuthService {

    getProfile() {
      return decode(this.getToken());
    }  
    loggedIn() {
      const token = this.getToken();
      return !!token && !this.isTokenExpired(token);
    }
  
    isTokenExpired(token) {
      try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    }
  

    getToken() {
      // user token from localStorage
      return localStorage.getItem('id_token');
    }
    login(idToken) {
      // user token to localStorage
      localStorage.setItem('id_token', idToken);  
      window.location.assign('/');
    }
  
    // clear token from localStorage 
    logout() {
      localStorage.removeItem('id_token');
      window.location.assign('/');
    }
  }

export default new AuthService();