import axiosCustom from "./axiosCustom";

export default async function putTodo(
  id: number,
  todoInfo: { todo: string | undefined; isCompleted: boolean | undefined }
) {
  const accessToken = localStorage.getItem("jwt");

  return await axiosCustom.put(`/todos/${id}`, todoInfo, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}
