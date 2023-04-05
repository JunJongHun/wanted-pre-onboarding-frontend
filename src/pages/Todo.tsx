import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hasToken from "../utils/hasToken";

function Todo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasToken()) navigate("/signin");
  });

  return <div>todo</div>;
}

export default Todo;
