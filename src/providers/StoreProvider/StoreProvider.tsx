import React, { createContext, useEffect, useState } from 'react';
import { ModuleType } from '../../typings/Module';
import { DispatchType, dispatchStoreAction, initGlobalStore } from '../../utils/singletons';


export type StoreProviderType<StoreType> = {
  store: StoreType;
  dispatch: DispatchType;
};

type ProviderProps = {
  modules: Array<ModuleType>
  children: React.ReactNode;
}

export const StoreContext = createContext<StoreProviderType<any> | null>(null);

const StoreProvider: React.FC<ProviderProps> = ({ modules, children }) => {
  const [store, setStore] = useState({})

  const dispatch: DispatchType = (action, payload) => {
    const newStore = dispatchStoreAction(action, payload);
    setStore(newStore);

    return newStore;
  }

  useEffect(() => {
    setStore(initGlobalStore(modules));
  }, [modules]);

  return (
    <StoreContext.Provider value={{store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};


export default StoreProvider;
