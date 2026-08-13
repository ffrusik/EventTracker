import { redirect } from "react-router";

export function getTokenDuration() {
  const token = localStorage.getItem("token");

  if (!token) {
    return 0;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));

  return payload.exp * 1000 - Date.now();
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  if (getTokenDuration() <= 0) {
    localStorage.removeItem("token");
    return null;
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  return null;
}
