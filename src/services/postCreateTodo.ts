import axiosCustom from "./axiosCustom";

export default async function postCreateTodo(todo: string) {
  const accessToken = localStorage.getItem("jwt");

  return await axiosCustom.post(
    "/todos",
    { todo },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
}
