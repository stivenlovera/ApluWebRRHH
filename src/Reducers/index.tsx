import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storeReducer from './Slices/LoginSlice';
interface storeLoginProps {

}

export const storeToken = configureStore({
    reducer: storeReducer
});
