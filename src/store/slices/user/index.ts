import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clearUserState, saveUserState } from '@/store/browser-storage';
import { UserData } from '@/types';

interface Params {
	name: string;
	password: string;
}

export interface UserState {
	data: UserData | null;
	loading: boolean;
	error?: string | null;
}

const initialState: UserState = {
	data: null,
	loading: false,
	error: null,
};

export const login = createAsyncThunk<
	UserData,
	Params
	// { rejectValue: string}
>('user/login', async (params, { rejectWithValue }) => {
	const res = await fetch(import.meta.env.VITE_API_URL + '/3-quiz/auth', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(params),
	});

	if (!res.ok) {
		return rejectWithValue('Неверный пароль. Проверьте правильность ввода или создайте новый аккаунт');
	}

	const data = await res.json();
	return (data?.user || data) as UserData;
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
      state.error = null;
			clearUserState();
		},
    clearError: (state) => {
      state.error = null;
    }
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
				saveUserState(action.payload.name!);
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
