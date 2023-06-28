import { configureStore } from '@reduxjs/toolkit'
import habitsReducer from './Slices/habitSlice'
const store = configureStore({
    reducer: {
        allHabits: habitsReducer,
    },
})

export default store;