import { Dispatch, ReactNode, useEffect, useReducer, useState } from "react";
import { useSocket } from "../sockets/useSocket";
import { CacheContext } from "./CacheContext";
import { cacheReducer, initialCacheState } from "./cacheStore";

export const CacheProvider = (props: { children: ReactNode }) => {
  const [cache, dispatch] = useReducer(cacheReducer, initialCacheState);

  const socket = useSocket();

  useEffect(() => {
    socket.once("serverCache", (cache) => {
      dispatch({ type: "initialServerCache", cache });
    });
  }, []);

  const value = {
    cache,
    dispatch,
  };

  return (
    <CacheContext.Provider value={value}>
      {props.children}
    </CacheContext.Provider>
  );
};
