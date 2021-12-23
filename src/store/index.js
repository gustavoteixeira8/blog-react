import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './modules/rootReducer';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './modules/rootSaga';
import { rootPersist } from './modules/rootPersist';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootPersist(rootReducer), applyMiddleware(sagaMiddleware));

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
