import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import DataReducer from '../reducers/DataReducer';
import InfoCoinsReducer from '../reducers/InfoCoinsReducer';
import SetUserReducer from '../reducers/SetUserReducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['allInfoCoins', 'data', 'setUser']
};


const Reducers = combineReducers({
    data: DataReducer,
    allInfoCoins: InfoCoinsReducer,
    setUser: SetUserReducer
})

export default persistReducer(persistConfig, Reducers)