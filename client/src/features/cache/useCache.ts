import { useCallback, useContext, useEffect, useState } from "react";
import { useSocket } from "../sockets/useSocket";
import { CacheContext } from "./CacheContext";

export const useCacheStore = () => {
  return useContext(CacheContext);
};
