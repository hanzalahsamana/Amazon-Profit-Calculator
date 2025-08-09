"use client";

import { combineReducers } from "@reduxjs/toolkit";
import { calculationReducer } from "./Calculation/calculationSlice";

const rootReducer = combineReducers({
  calculation: calculationReducer,
});

export default rootReducer;
