import { useContext } from "react";
import { StoreContext, StoreProviderType } from "../providers/StoreProvider/StoreProvider";

export default function useGlobalStore<StoreType>(): StoreProviderType<StoreType> {
  const data = useContext(StoreContext);

  if (!data) {
    throw new Error(
      'No Context value found for `useGlobalStore`. Did you forget to wrap your application in the `StoreProvider`?'
    );
  }

  return data;
};
