import { create } from 'zustand';

const updateState = (set, stateKey, value) => {
    set((state) => ({
        [stateKey]: typeof value === 'function' ? value(state[stateKey]) : value,
    }));
};

export const states = create((set) => ({
    user: null,
    setUser: (v) => updateState(set, 'user', v),
}));


