import { AUTHOR_ACTIONS } from './actionTypes';
import AuthorService from '../../services/AuthorService';

export const addAuthor = (author) => {
	return (dispatch) => {
		AuthorService.create(author).then((author) => {
			dispatch({
				type: AUTHOR_ACTIONS.ADD_AUTHOR,
				payload: author,
			});
		});
	};
};

export const setAuthors = (authors) => {
	return {
		type: AUTHOR_ACTIONS.SET_AUTHORS,
		payload: authors,
	};
};
