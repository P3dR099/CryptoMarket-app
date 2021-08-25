import { combineReducers } from 'redux';
import DataReducer from '../reducers/DataReducer';
import InfoCoinsReducer from '../reducers/InfoCoinsReducer';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['allInfoCoins', 'data']
};


const Reducers = combineReducers({
    data: DataReducer,
    allInfoCoins: InfoCoinsReducer,
})

export default persistReducer(persistConfig, Reducers)