# Ezpzee Store Manager

## Scope
Create a straight forward way to manage the app global store and allow communication between components and/or services.

## Usage
### Setup

First I recommend declaring a global store type. This will help you down the line to know what values to expect into your store and how to use or process them.

`types.ts`
```tsx
export type GlobalStoreType = {
  currentUser: {
    id: string;
    name: string;
    email: string;
  }
}
```

Now let's write our first global store module `AuthModule.ts`
```tsx
import { StoreProvider, ModuleType, ReducerType } from '@ezpzee/store'
import { GlobalStoreType } from './types'

// use Symbol to make sure you have unique action identifiers
export const AuthActions  = {
  SUCCESS: Symbol('AUTH_SUCCESS') 
}

// using a store type with the ReducerType will add intelisense on prevStore argument
const AuthReducer: ReducerType<GlobalStoreType> = (prevStore, action, payload) => {
  switch (action) {
    case AuthActions.SUCCESS:
      return {...prevStore, currentUser: payload}

    default:
      return prevStore
  }
}

export default {
  actions: AuthActions,
  reducer: AuthReducer,
  initialState: {}
}
```

Finally we can now setup the store provider at the top level of our app.
```tsx
import { StoreProvider, ModuleType } from '@ezpzee/store'
import AuthModule from './AuthModule'

import { App } from './App'

const modules: Array<ModuleType> = [
  AuthModule
]

<StoreProvider modules={modules}>
  <App />
</StoreProvider>
```

And that's all for the setup. Easy peasy right?

### Dispatching actions
You have two ways of dispatching an action:

Using `useGlobalStore` hook:

```tsx
import { useGlobalStore } from '@ezpzee/store'
import { AuthActions } from './AuthModule'

export const SampleComponent = () => {
  const { dispatch } = useGlobalStore()

  const auth = async (username, pass) => {
    const response = await authApiCall(username, pass)
    dispatch(AuthActions.SUCCESS, response)
  }

  return ...
}
```

or using `dispatchStoreAction` function:

```tsx
import { dispatchStoreAction } from '@ezpzee/store'
import { AuthActions } from './AuthModule'

export const AuthFunction = (username, pass) => {
  const response = await authApiCall(username, pass)
  dispatchStoreAction(AuthActions.SUCCESS, response)
}
```

Both functions return the new store after reducers have been executed. You can also use `const newStore = dispatch<StoreType>(action, payload)` for better intelisense.

#### What about async actions?
I do not plan to integrate async functionality. The scope of the library is just to manage the global scope. Any async processes should take place before dispatching the action with the final payload.

## Accesing the store
Same as the `dispatch` you have two ways of accessing the store:

Using `useGlobalStore` hook:
```tsx
import { useGlobalStore } from '@ezpzee/store'
import { GlobalStoreType } from './types'

export const HeaderComponent = () => {
  // Store type is optional, is just gives better intelisense for the store property
  const { store } = useGlobalStore<GlobalStoreType>()
  const { currentUser } = store;

  return <>Hello {currentUser.name}</>
}
```

or using `getGlobalStore` function:
```tsx
import { getGlobalStore } from '@ezpzee/store'
import { GlobalStoreType } from './types'

export const HelperFunction = () => {
  // Store type is optional, is just gives better intelisense for the store property
  const store = getGlobalStore<GlobalStoreType>()

  return currentUser.name
}
```