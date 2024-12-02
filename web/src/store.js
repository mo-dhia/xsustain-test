import { create } from 'zustand';

const updateState = (set, stateKey, value) => {
    set((state) => ({
        [stateKey]: typeof value === 'function' ? value(state[stateKey]) : value,
    }));
};


const dummyUser = {
    "_id": "674c7d3356ba8ee1e2448c44",
    "email": "admin@xsustain.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGM3ZDMzNTZiYThlZTFlMjQ0OGM0NCIsImlhdCI6MTczMzA4NTQ3NiwiZXhwIjoxNzM1Njc3NDc2fQ.UUfYaq8mhqD3mA0mq4OtlIJGTpajWZevyx_pA3Nmj_o"
}
export const states = create((set) => ({
    user: null,
    setUser: (v) => updateState(set, 'user', v),
}));


