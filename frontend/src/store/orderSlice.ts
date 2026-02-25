import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

export interface Order {
    id: string;
    date: string;
    total: number;
    status: string;
    items: OrderItem[];
}

interface OrderState {
    orders: Order[];
}

const initialState: OrderState = {
    orders: [],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload); // Add new order to the top
        },
    },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
