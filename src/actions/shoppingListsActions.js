import {
	ACTIVATE_SHOPPING_LIST,
	ADD_SHOPPING_LIST,
	ARCHIVE_SHOPPING_LIST,
	DELETE_SHOPPING_LIST,
	EDIT_SHOPPING_LIST,
	RECOVER_SHOPPING_LISTS,
	SELECT_SHOPPING_LIST,
} from './types';

export const addShoppingList = (payload) => ({
	type: ADD_SHOPPING_LIST,
	payload,
});

export const recoverFromStorage = (payload) => ({
	type: RECOVER_SHOPPING_LISTS,
	payload,
});

export const removeAllLists = () => ({
	type: RECOVER_SHOPPING_LISTS,
	payload: {
		activeLists: [],
		archivedLists: [],
	},
});

export const deleteList = (idx, listType) => ({
	type: DELETE_SHOPPING_LIST,
	payload: {
		idx,
		listType,
	},
});

export const archiveList = (idx) => ({
	type: ARCHIVE_SHOPPING_LIST,
	payload: {
		idx,
	},
});

export const activateList = (idx) => ({
	type: ACTIVATE_SHOPPING_LIST,
	payload: {
		idx,
	},
});

export const selectList = (idx) => ({
	type: SELECT_SHOPPING_LIST,
	payload: {
		idx,
	},
});

export const editList = (idx, list) => ({
	type: EDIT_SHOPPING_LIST,
	payload: {
		idx,
		list,
	},
});
