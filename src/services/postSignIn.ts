import { InfoType } from "../types/info";
import axiosCustom from "./axiosCustom";

export default async function postSignIn(data: InfoType) {
  return await axiosCustom
    .post("auth/signin", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
}
