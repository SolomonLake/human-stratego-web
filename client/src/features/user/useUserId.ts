import { v4 as uuidv4 } from "uuid";

export const useUserId = () => {
  const localStorageUserId = localStorage.getItem("userId");

  if (localStorageUserId) {
    return localStorageUserId;
  } else {
    const userId = uuidv4();
    localStorage.setItem("userId", userId);
    return userId;
  }
};
