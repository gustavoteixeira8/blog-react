import storage from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { getSecretKey } from '../../utils/getSecretKey';

export const rootPersist = (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'blog',
      storage,
      whitelist: ['auth', 'user'],
      transforms: [
        encryptTransform({
          secretKey: getSecretKey(),
          onError() {
            dispatchEvent('storage');
          },
        }),
      ],
      serialize: true,
    },
    reducers,
  );

  return persistedReducers;
};
