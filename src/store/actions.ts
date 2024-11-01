import { Actions, Screens } from '../types/store';
import { getPublications, getDiscoverCards, getUserName } from '../utils/firebase';

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};

export const getProductsAction = async () => {
	const products = await getPublications();
	return {
		action: Actions.GETPUBLICATIONS,
		payload: products,
	};
};

export const setUserCredentials = (user: string) => {
	return {
		action: Actions.SETUSERCREDENTIALS,
		payload: user,
	};
};

export const getDiscoverCardsAction = async () => {
	const cards = await getDiscoverCards();
	return {
		action: Actions.GETDISCOVERCARDSACTION,
		payload: cards,
	};
};

export const getUserNameAction = async () => {
	const cards = await getUserName();
	return {
		action: Actions.GETUSERNAME,
		payload: cards,
	};
};