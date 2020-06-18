import {
	ACTIVATE_SHOPPING_LIST,
	ADD_SHOPPING_LIST,
	ARCHIVE_SHOPPING_LIST,
	BUY_ITEM,
	DELETE_SHOPPING_LIST,
	EDIT_SHOPPING_LIST,
	RECOVER_SHOPPING_LISTS,
	REMOVE_ALL_LISTS,
	RETURN_ITEM,
	SELECT_SHOPPING_LIST,
} from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';
import LIST_TYPES from '../constants/LIST_TYPES';

const INITIAL_STATE = {
	activeLists: [],
	archivedLists: [],
};

const sortArrayByDate = (arr) => {
	return arr.sort((a, b) => {
		return a.created - b.created;
	});
};

const rootReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	let newState, currentList;

	switch (type) {
		// Lists actions
		case RECOVER_SHOPPING_LISTS:
			return { ...payload };
		case REMOVE_ALL_LISTS:
			return { ...payload };

		// List actions
		case ADD_SHOPPING_LIST:
			newState = { ...state };
			newState.activeLists.push(payload);
			sortArrayByDate(newState.activeLists);

			AsyncStorage.setItem('shoppingLists', JSON.stringify(newState));
			return { ...newState };
		case DELETE_SHOPPING_LIST:
			newState = { ...state };
			let listType =
				payload.listType === LIST_TYPES.ACTIVE
					? 'activeLists'
					: 'archivedLists';

			newState[listType].splice(payload.idx, 1);
			if (listType === 'activeLists') {
				if (
					newState[listType][payload.idx].selected &&
					newState.activeLists.length > 0
				)
					newState.activeLists[0].selected = true;
				newState[listType].selected = false;
			}

			sortArrayByDate(newState.activeLists);
			AsyncStorage.setItem('shoppingLists', JSON.stringify(newState));
			return { ...newState };
		case ARCHIVE_SHOPPING_LIST:
			newState = { ...state };
			currentList = newState.activeLists.splice(payload.idx, 1)[0];
			if (currentList.selected && newState.activeLists.length > 0)
				newState.activeLists[0].selected = true;
			currentList.selected = false;
			newState.archivedLists.push(currentList);
			sortArrayByDate(newState.archivedLists);
			AsyncStorage.setItem('shoppingLists', JSON.stringify(newState));
			return { ...newState };
		case ACTIVATE_SHOPPING_LIST:
			newState = { ...state };
			currentList = newState.archivedLists.splice(payload.idx, 1)[0];
			newState.activeLists.push(currentList);
			sortArrayByDate(newState.activeLists);
			AsyncStorage.setItem('shoppingLists', JSON.stringify(newState));
			return { ...newState };
		case SELECT_SHOPPING_LIST:
			newState = { ...state };
			for (let list of newState.activeLists) {
				list.selected = false;
			}
			newState.activeLists[payload.idx].selected = true;
			sortArrayByDate(newState.activeLists);
			AsyncStorage.setItem('shoppingLists', JSON.stringify(newState));
			return { ...newState };
		case EDIT_SHOPPING_LIST:
			newState = { ...state };
			newState.activeLists[payload.idx] = payload.list;
			sortArrayByDate(newState.activeLists);
			console.log('state', state);
			console.log('newState', newState);
			AsyncStorage.setItem('shoppingLists', JSON.stringify(newState));
			return { ...newState };

		// Item actions
		case BUY_ITEM:
		case RETURN_ITEM:
			newState = { ...state };
			let listIdx;
			for (let i = 0; i < newState.activeLists.length; i++) {
				if (newState.activeLists[i].listName === payload.listName) {
					listIdx = i;
					break;
				}
			}

			newState.activeLists[listIdx].items[payload.idx].bought =
				type === BUY_ITEM;

			AsyncStorage.setItem('shoppingLists', JSON.stringify(newState));
			return newState;

		default:
			return state;
	}
};

export default rootReducer;
