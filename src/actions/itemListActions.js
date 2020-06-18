import { BUY_ITEM, RETURN_ITEM } from './types';

export const buyItem = (payload) => ({
	type: BUY_ITEM,
	payload,
});

export const returnItem = (payload) => ({
	type: RETURN_ITEM,
	payload,
});
