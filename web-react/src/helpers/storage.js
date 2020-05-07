
const keyToken = "user";

const Storage = {
  setToken(token) {
    localStorage.setItem(keyToken, token)
  },
  getToken() {
    return localStorage.getItem(keyToken);
  }
}

export default Storage