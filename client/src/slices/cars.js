import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import carDataService from "../services/carDataService";

const initialState = {
    data: [],
    isLoading: false,
    error: null,
};

export const addCar = createAsyncThunk(
    "cars/add",
    async ({ data }) => {
        try {
            const response = await carDataService.addCar(data);
        
            return response.data;
        } catch (error) {
            throw error;
        }        
    }
);

export const fetchCars = createAsyncThunk(
    "cars/fetch",
    async () => {
        try {
            const response = await carDataService.getCars();

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const fetchCar = createAsyncThunk(
    "car/fetch",
    async ({ carId }) => {
        try {
            const response = await carDataService.getCar(carId);

            return response.data.car;
        } catch (error) {
            throw error;
        }
    }
);

export const updateCar = createAsyncThunk(
    "cars/update",
    async ({ carId, data }) => {
        try {
            const response = await carDataService.updateCar(carId, data);
        
            return response.data;
        } catch (error) {
            throw error; 
        }
    }
);

export const deleteCar = createAsyncThunk(
    "car/delete",
    async ({ carId }) => {
        try {
            const response = await carDataService.deleteCar(carId);
        
            return response.data;
        } catch (error) {
            throw error; 
        }
    }
);

const carsSlice = createSlice({
    name: "cars",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(addCar.fulfilled, (state, action) => {
            state.data.push(action.payload);
        })
        .addCase(fetchCars.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchCars.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.cars;
        })
        .addCase(fetchCars.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(updateCar.fulfilled, (state, action) => {
            const payload = action.payload;

            if (payload.car) {
                const index = state.data.findIndex(car => car.carId === payload.car.carId);
            
                state.data[index] = { ...state.data[index], ...action.payload.car };
            }
        })
        .addCase(deleteCar.fulfilled, (state, action) => {
            const carId = action.payload.car.carId;
            const filteredData = state.data.filter(car => car.carId !== carId);
            
            state.data = filteredData;
        })
    },
});

export default carsSlice.reducer;

