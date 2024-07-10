export type ReducerType<StoreType> =(prevStore: StoreType, action: Symbol, payload: any) => StoreType

export type ModuleType = {
  actions: Object;
  reducer: ReducerType<Object>;
  initialState: Object;
}