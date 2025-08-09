import axios from "axios";
import BASE_URL from "../../config";
import { store } from "../Redux/store";
import {
  setCalculation,
  setCalculationLoading,
} from "../Redux/Calculation/calculationSlice";

export const calculateProfit = async (payload) => {
  try {
    store.dispatch(setCalculationLoading(true));
    const response = await axios.post(`${BASE_URL}/post/calculate-profit`, payload);
    store.dispatch(setCalculation(response.data));
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    store.dispatch(setCalculationLoading(false));
  }
};