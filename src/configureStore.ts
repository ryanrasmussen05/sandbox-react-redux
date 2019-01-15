import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

export default function configureStore() {
    const loggerMiddleware = createLogger();

    const middlewares: any[] = [thunkMiddleware];

    if (process.env.NODE_ENV === 'development') {
        middlewares.push(loggerMiddleware);
    }

    const middlewareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(rootReducer, middlewareEnhancer);

    return store;
}