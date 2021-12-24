import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export const rootPersist = (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'blog',
      storage,
      whitelist: ['auth'],
    },
    reducers,
  );

  return persistedReducers;
};
