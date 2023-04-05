import axiosCustom from "./axiosCustom";

export default async function getTodos() {
  const accessToken = localStorage.getItem("jwt");

  return await axiosCustom
    .get("/todos", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data);
}
