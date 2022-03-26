import { ReactNode, useState } from "react";
import { InitialServerCacheContext } from "./InitialServerCacheContext";
import { useServerCacheOnce } from "./useServerCacheOnce";

export const InitialServerCacheProvider = (props: { children: ReactNode }) => {
  const [initialServerCache, setInitialServerCache] = useState<
    ServerCache | undefined
  >();

  useServerCacheOnce((cache) => {
    setInitialServerCache(cache);
  });

  return (
    <InitialServerCacheContext.Provider value={initialServerCache}>
      {props.children}
    </InitialServerCacheContext.Provider>
  );
};
