import { createStore } from 'redux';
// import thunk from 'redux-thunk';
import Reducers from './index';
// import InfoCoinsReducer from '../reducers/InfoCoinsReducer';
import { persistStore } from 'redux-persist';

// const initialState = {};
// const middleware = [thunk];

export const store = createStore(Reducers);

export const persistor = persistStore(store)

export default { store, persistor };