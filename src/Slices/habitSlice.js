import { createSlice } from '@reduxjs/toolkit'

export const details = [
    { day: 'Mon', status: 'none' },
    { day: 'Tue', status: 'none' },
    { day: 'Wed', status: 'none' },
    { day: 'Thu', status: 'none' },
    { day: 'Fri', status: 'none' },
    { day: 'Sat', status: 'none' },
    { day: 'Sun', status: 'none' },
]

// load habits from local storage if there are any
const habitsFromStorage = localStorage.getItem('newHabits')
    ? JSON.parse(localStorage.getItem('newHabits'))
    : [{ title: 'early bird', description: 'wake up at 3:45am', details }]

let habits = [...habitsFromStorage]

const initialState = {
    habits: habits,
}


// habitsSlice contains store, actions and reducers
const habitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        // add habit
        addHabit: (state, { payload }) => {
            state.habits = [...state.habits, payload]
            habits = [...habits, payload]
            window.localStorage.setItem('newHabits', JSON.stringify(habits))
        },
        // delete habits
        deleteHabit: (state, action) => {
            state.habits = state.habits.filter((habit) => habit.title !== action.payload)
            window.localStorage.setItem('newHabits', JSON.stringify(state.habits))
        },
        // update status
        changeStatus: (state, { payload }) => {
            state.habits.forEach((habit) => {
                if (habit.title === payload.title) {
                    habit.details.forEach((detail) => {
                        if (detail.day === payload.details[0].day) {
                            detail.status = payload.details[0].status
                        }
                    })
                }
            })
            window.localStorage.setItem('newHabits', JSON.stringify(state.habits))
        },
    },
})

export const { addHabit, deleteHabit, changeStatus } = habitsSlice.actions;

export default habitsSlice.reducer;