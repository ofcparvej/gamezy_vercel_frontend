import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import store from './Store/store';

import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';

// let persistor=persistStore(store) ;

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
<Provider store={store}>   

    <BrowserRouter>
    {/* <PersistGate persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
    </BrowserRouter>
</Provider>

);
