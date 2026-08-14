export async function createEvent(eventName) {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ name: eventName }),
  });

  if (!response.ok) {
    const error = new Error("Failed to create event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function getEvents() {
  return await fetch("/api/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => res.json());
}

export async function getEventInfo(eventId) {
  return await fetch(`/api/events/${eventId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => res.json());
}

export async function deleteEvent(eventId) {
  return await fetch(`/api/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => res.json());
}

export async function signUp({ email, password, confirmPassword }) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, confirmPassword }),
  });

  if (!response.ok) {
    const error = new Error("Failed to sign up");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { user } = await response.json();

  return user;
}

export async function login({ email, password }) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = new Error("Failed to login");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { token } = await response.json();

  localStorage.setItem("token", token);
}

export async function me() {
  const response = await fetch("/api/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    const error = new Error("Failed to fetch user data");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
