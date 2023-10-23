const USER_KEY = 'name';
const AUTH_KEY = 'auth-GyCp6seciH7PGVyFIq8Q';

export const loadUserState = (): string | null => {
	if (!localStorage.getItem(AUTH_KEY)) {
		localStorage.clear();
		return null;
	}

	return localStorage.getItem(USER_KEY);
};

export const saveUserState = (name: string | null) => {
	if (!name) return;

	localStorage.setItem(AUTH_KEY, 'true');
	localStorage.setItem(USER_KEY, name);
};

export const clearUserState = () => {
	localStorage.removeItem(USER_KEY);
};
