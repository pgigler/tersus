import { navigate } from "@reach/router";

const isBrowser = typeof window !== `undefined`;

const getUser = (): LoggedInUser | undefined => {
	const user: LoggedInUser | undefined = window.localStorage.googleUser
		? JSON.parse(window.localStorage.googleUser)
		: undefined;
	if (user !== undefined) {
		if (user.expires_at < new Date()) {
			removeUser();
			return undefined;
		}
	}

	return user;
};

export interface LoggedInUser {
	name: string;
	email: string;
	givenName: string;
	familyName: string;
	id_token: string;
	expires_at: Date;
}

const setUser = (user?: LoggedInUser) => {
	window.localStorage.googleUser = JSON.stringify(user);
};

const removeUser = () => {
	window.localStorage.removeItem("googleUser");
};

export const handleLogin = (user: LoggedInUser) => {
	if (!isBrowser) return false;

	if (user) {
		setUser(user);
		navigate(`/ops`);
	}

	return false;
};

export const isLoggedIn = (): boolean => {
	return getCurrentUser() !== undefined;
};

export const getCurrentUser = () => (isBrowser ? getUser() : undefined);

export const logout = (callback) => {
	if (!isBrowser) return;

	removeUser();
	callback();
};
