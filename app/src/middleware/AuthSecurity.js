import Cookies from "js-cookie";

export function authMiddleware(to, from, next) {
  const authData = JSON.parse(Cookies.get("auth"));


  if (authData && authData.isAdmin) {
    next();
  } else {
    next('/login'); 
  }
} 