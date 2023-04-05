import axios from "axios";

const axiosCustom = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop",
});

export default axiosCustom;
