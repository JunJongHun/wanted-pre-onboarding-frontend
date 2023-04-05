export default function hasToken() {
  return localStorage.getItem("jwt") ? true : false;
}
