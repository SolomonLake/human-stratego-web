import { useContext } from "react";
import { UserIdContext } from "./UserIdContext";

export const useUserId = () => useContext(UserIdContext);
