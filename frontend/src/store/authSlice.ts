import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    userId: string | null;
    email: string | null;
    role: string | null;
}

// Check local storage for existing token if running in the browser
const getInitialState = (): AuthState => {
    if (typeof window !== 'undefined') {
        return {
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
            email: localStorage.getItem('email'),
            role: localStorage.getItem('role'),
        };
    }
    return { token: null, userId: null, email: null, role: null };
};

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; userId: string; email: string; role: string }>
        ) => {
            const { token, userId, email, role } = action.payload;
            state.token = token;
            state.userId = userId;
            state.email = email;
            state.role = role;

            if (typeof window !== 'undefined') {
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('email', email);
                localStorage.setItem('role', role);
            }
        },
        logout: (state) => {
            state.token = null;
            state.userId = null;
            state.email = null;
            state.role = null;

            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('email');
                localStorage.removeItem('role');
            }
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
