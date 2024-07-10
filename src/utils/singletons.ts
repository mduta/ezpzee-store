import { Subject } from 'rxjs';
import { ModuleType } from '../typings/Module';

type ActionStreamType = { action: Symbol, payload: Object };
export type DispatchType = (action: Symbol, payload: Object) => Object

let ModulesStore: Array<ModuleType> = [];
let GlobalStore: Object = {};

export const StoreActionsStream = new Subject<ActionStreamType>();

export const initGlobalStore = (modules: Array<ModuleType>): Object => {
  GlobalStore = modules.reduce((accumulator, value) => ({...accumulator, ...value.initialState}), {})
  ModulesStore = modules;
  return GlobalStore;
}

export const dispatchStoreAction: DispatchType = (action, payload) => {
  StoreActionsStream.next({action, payload})

  const activeModule = ModulesStore.find(module => Object.values(module.actions).find(key => key === action))
  if (activeModule) {
    GlobalStore = activeModule.reducer(GlobalStore, action, payload)
  }

  return GlobalStore;
}

export const getGlobalStore = <StoreType>(): StoreType => {
  return GlobalStore as StoreType;
}