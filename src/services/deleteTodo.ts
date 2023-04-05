import axiosCustom from "./axiosCustom";

export default async function deleteTodo(id: number) {
  const accessToken = localStorage.getItem("jwt");

  return await axiosCustom.delete(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
