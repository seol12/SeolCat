import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from '../reducers';
import rootSaga from '../sagas';


const configStore = () => {
  
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleware))

    : composeWithDevTools(applyMiddleware(...middleware))
  const store = createStore(rootReducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;

};

const wrapper = createWrapper(configStore, { debug: process.env.NODE_ENV === 'development' });


export default wrapper;