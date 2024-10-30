export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	publications: [];
	user: {};
};

export enum Screens {
	'REGISTER' = 'REGISTER',
	'LOGIN' = 'LOGIN',
	'DASHBOARD' = 'DASHBOARD',
	'CLUBSLANDING' = 'CLUBSLANDING',
	'CLUBSMAIN' = 'CLUBSMAIN',
	'DISCOVERLANDING' = 'DISCOVERLANDING',
	'DISCOVERMAIN' = 'DISCOVERMAIN',
}

export enum Actions {
	'NAVIGATE' = 'NAVIGATE',
	'GETPUBLICATIONS' = 'GETPUBLICATIONS',
	'SETUSERCREDENTIALS' = 'SETUSERCREDENTIALS',
}