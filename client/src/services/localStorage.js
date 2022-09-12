const addUserToLocalStorage = ({ user, token }) => {
  if (user) localStorage.setItem("user", JSON.stringify(user));
  if (token) localStorage.setItem("token", token);
};

const removeUserToLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export { addUserToLocalStorage, removeUserToLocalStorage };
