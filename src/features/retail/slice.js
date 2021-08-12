import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBookingsByUserId, newBookingAPI, registerNewUserAPI, validateUserLogin,updateUserLoginAPI } from './api';
const initialState = {
    info: {

    },
    activity: {
        loggedIn: false
    },
    bookings: [],
    snack: {
        open: false,
        duration: 5000,
        severity: "success",
        message: "default message",
        vertical: "top",
        horizontal: "center"
    }
}
export const registerNewUserThunk = createAsyncThunk(
    'retail/signup',
    async (payload, { rejectWithValue }) => {
        try {
            
        await registerNewUserAPI(payload);
        // The value we return becomes the `fulfilled` action payload
        return payload;
        } catch (error) {
            return rejectWithValue(error.message)
        }   
    }
);
export const userLoginThunk = createAsyncThunk(
    'retail/login',
    async (payload, { rejectWithValue }) => {
        try {
            
        const response = await validateUserLogin(payload);
        if (response.success) {
            return Promise.resolve(response.data);
        }
        return rejectWithValue("Invalid Creds!!")
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchBookingsOfUserByIdThunk = createAsyncThunk(
    'retail/fetchBookingsByUserId',
    async (user_id, { rejectWithValue }) => {
        try {
            const response = await fetchBookingsByUserId(user_id);
            if (response.success) {
                return Promise.resolve(response.data);
            }
            return rejectWithValue("Fetching bookings failed")
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

export const newBookingThunk = createAsyncThunk(
    'retail/newbooking',
    async(payload, { rejectWithValue })=>{
        try {
            const response = await newBookingAPI(payload);
            if(response.success){

            return payload;
            }
            else
                return Promise.reject("Booking Failed");
        } catch (error) {
            return Promise.reject(error);
        }
    }
)
//new thunk for update user
export const updateUserThunk = createAsyncThunk(
    'retail/user',
    async(payload, { rejectWithValue })=>{
        try {
            const response = await updateUserLoginAPI(payload);
            if(response.success){

            return payload;
            }
            else
                return Promise.reject("Booking Failed");
        } catch (error) {
            return Promise.reject(error);
        }
    }
)

export const selectUserInfo = (state) => state.retail.info;
export const selectUserActivity = (state) => state.retail.activity;
export const selectUserBookings = (state) => state.retail.bookings;
export const selectRetailSnackOptions = (state)=> state.retail.snack;


const retailSlice = createSlice({
    name: 'retail',
    initialState,
    reducers: {
        logout(state) {
            state.info = {};
            state.activity = {
                loggedIn: false
            }
        },
        retailSnackClose(state){
            state.snack.open = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerNewUserThunk.rejected, (state) => {
                state.activity = {
                    loggedIn: false
                };
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: "New User Registration Failed!!!",
                    severity: "error"
                }
            })
            .addCase(registerNewUserThunk.fulfilled, (state, action) => {
                state.info = action.payload;
                state.activity.loggedIn = true;
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: "New User Registration Succesfull!!!",
                    severity: "success"
                }
            })
            .addCase(userLoginThunk.fulfilled, (state, action) => {
                state.activity = {
                    loggedIn: true
                }
                state.info = action.payload;
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: "User Login Succesfull!!!",
                    severity: "success"
                }
            })
            .addCase(userLoginThunk.rejected, (state, action) => {
                state.activity.loggedIn = false;
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: "Invalid Creds!!!",
                    severity: "error"
                }
            })
            .addCase(fetchBookingsOfUserByIdThunk.fulfilled, (state, action) => {
                state.bookings = action.payload;
            })
            .addCase(newBookingThunk.fulfilled, (state, action)=>{
                console.log("newbooking success");
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: "New Booking is Successful!!!!",
                    severity: "success"
                }
            })
            .addCase(newBookingThunk.rejected, (state, action)=>{
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: "Error in new booking",
                    severity: "error"
                }
            })
            .addCase(updateUserThunk.fulfilled, (state, action)=>{
                console.log("update success");
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: "Update is Successful!!!!",
                    severity: "success"
                }
            })
            .addCase(updateUserThunk.rejected, (state, action)=>{
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: "Error in user!!!!",
                    severity: "error"
                }
            })
            

    }
});
export const {  logout, retailSnackClose } = retailSlice.actions;
export default retailSlice.reducer;