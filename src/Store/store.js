// import {applyMiddleware, configureStore} from "@reduxjs/toolkit"
// import authSlice from "../Store/Slices/AuthSlice" // it is user reducer..

// //persist redux
// import storage from "redux-persist/lib/storage"
// import {persistReducer} from "redux-persist"
// import { combineReducers } from "@reduxjs/toolkit"
// // import ReduxThunk
// // import logger from 'redux-logger'
// import { thunk } from "redux-thunk"

// //persist config

// const persistConfig = {
//     key: 'root',
//     storage,
//     debug: true,

//   };

// // const reducer = combineReducers({auth:authSlice});

// const persistedReducer = persistReducer(persistConfig,authSlice);

// const store = configureStore({
//     reducer:persistedReducer,
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/AuthSlice"


const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});


export default store;

