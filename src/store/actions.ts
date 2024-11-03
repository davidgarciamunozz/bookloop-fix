import { Actions, Screens } from '../types/store';
import { getPublications, getDiscoverCards, getClubsCards, addClubsCards, getUserName } from '../utils/firebase';

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

// Action to obtain the active user's clubs
export const getClubsAction = async () => {
    const clubs = await getClubsCards();
    return {
        action: Actions.GETCLUBSARDSACTION,
        payload: clubs,
    };
};

// Action to add a specific club for the usero
export const addClubForUser = async (clubData: any) => {
    await addClubsCards(clubData);
};


export const getUserNameAction = async () => {
	const user = await getUserName();
	return {
		action: Actions.GETUSERNAME,
		payload: user,
	};
};