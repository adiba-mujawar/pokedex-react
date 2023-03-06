import { configureStore  } from 'redux';
import rootReducer from './reducers/index.js';

const store = configureStore (rootReducer);

export default store;