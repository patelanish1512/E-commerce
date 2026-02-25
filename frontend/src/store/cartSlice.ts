import { createSlice } from '@reduxjs/toolkit';

interface CartState {
    isDrawerOpen: boolean;
}

const initialState: CartState = {
    isDrawerOpen: false,
};

const cartSlice = createSlice({
    name: 'cartUI',
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.isDrawerOpen = !state.isDrawerOpen;
        },
        closeDrawer: (state) => {
            state.isDrawerOpen = false;
        },
        openDrawer: (state) => {
            state.isDrawerOpen = true;
        }
    },
});

export const { toggleDrawer, closeDrawer, openDrawer } = cartSlice.actions;
export default cartSlice.reducer;
