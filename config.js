const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://amazon-profit-calculator-backend.vercel.app/api/v1"
    : "http://localhost:5000/api/v1";

export default BASE_URL;
