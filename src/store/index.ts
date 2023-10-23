import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadUserState, saveUserState } from './browser-storage';
import userSlice from './slices/user';

const rootReducer = combineReducers({
	user: userSlice,
});

const preLoadedName = loadUserState();

export const store = configureStore({
	reducer: rootReducer,
	preloadedState: {
		user: {
			data: preLoadedName
				? {
						name: preLoadedName,
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }
				: null,
			loading: false,
			error: null,
		},
	},
});

store.subscribe(() => {
	saveUserState(store.getState().user.data?.name || '');
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
