import { applyMiddleware, combineReducers, createStore } from 'redux';
import { userReducer } from './user/reducer';
import { courseReducer } from './courses/reducer';
import { authorReducer } from './authors/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	user: userReducer,
	authors: authorReducer,
	courses: courseReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
