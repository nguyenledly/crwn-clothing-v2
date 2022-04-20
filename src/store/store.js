import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from "redux-saga";

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean);

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user', 'categories']
}

const persisttedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancer = compose(applyMiddleware(...middlewares));

export const store = createStore(persisttedReducer, undefined, composedEnhancer);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
