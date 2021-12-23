import { combineReducers } from 'redux';
import { exampleReducer } from './example/reducer';

export const rootReducer = combineReducers({ exampleReducer });
