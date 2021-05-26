import {createWrapper} from 'next-redux-wrapper';
import {createStore} from 'redux';

const store=(initalState=startState) => {
    return createStore(reducer,initalState);
};

export const initStore = createWrapper(store);