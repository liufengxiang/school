import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from '../reducers';

//使可以通过dispatch(push(''))跳转
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
const middleware = routerMiddleware(hashHistory) // Apply the middleware to the store

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  middleware
)(createStore)

export default function configureStore(initialState) {
    return createStoreWithMiddleware(
        rootReducer,
        initialState
    );
}
