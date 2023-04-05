import { InfoType } from "../types/info";
import axiosCustom from "./axiosCustom";

export default async function postSignUp(data: InfoType) {
  return await axiosCustom.post("auth/signup", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
