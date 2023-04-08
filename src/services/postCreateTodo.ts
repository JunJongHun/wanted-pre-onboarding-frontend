import { TodoType } from "../types/todo";
import axiosCustom from "./axiosCustom";

export default async function postCreateTodo(todo: string) {
  const accessToken = localStorage.getItem("jwt");

  return await axiosCustom
    .post<TodoType>(
      "/todos",
      { todo },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);
}
