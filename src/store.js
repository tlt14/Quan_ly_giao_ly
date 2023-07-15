import { configureStore } from '@reduxjs/toolkit'
// import { classApi } from './services/classes.service'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { studentApi } from './services/student.service'
// import { glvApi } from './services/glv.service'
// import { authApi } from './services/auth.service'
// import { userApi } from './services/user.service'
import authSlice from './services/auth.slice'
import { sacramentApi } from './services/sacrament.service'
import { api } from './services/api.service'
export const store = configureStore({
  reducer: {
    // [classApi.reducerPath]: classApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    // [glvApi.reducerPath]: glvApi.reducer,
    // [authApi.reducerPath]: authApi.reducer,
    // [userApi.reducerPath]: userApi.reducer,
    [sacramentApi.reducerPath]: sacramentApi.reducer,
    [api.reducerPath]: api.reducer,
    authSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
                                            // .concat(classApi.middleware)
                                            .concat(studentApi.middleware)
                                            // .concat(glvApi.middleware)
                                            // .concat(authApi.middleware)
                                            // .concat(userApi.middleware)
                                            .concat(sacramentApi.middleware)
                                            .concat(api.middleware)
})
setupListeners(store.dispatch)