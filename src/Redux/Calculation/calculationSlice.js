import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calculation: {},
  calculationLoading: false,
};

export const calculationSlice = createSlice({
  name: "calculation",
  initialState,
  reducers: {
    setCalculation: (state, action) => {
      state.calculation = action.payload;
    },
    setCalculationLoading: (state, action) => {
      state.calculationLoading = action.payload;
    },
  },
});

export const { setCalculation, setCalculationLoading } =
  calculationSlice.actions;

export const calculationReducer = calculationSlice.reducer;
