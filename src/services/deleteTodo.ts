import axiosCustom from "./axiosCustom";

export default async function updateTodo(id: number) {
  const accessToken = localStorage.getItem("jwt");

  return await axiosCustom.delete(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
