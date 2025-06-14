import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import commonReducer from './commonSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
