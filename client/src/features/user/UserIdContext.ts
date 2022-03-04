import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const UserIdContext = createContext<string>(uuidv4());
