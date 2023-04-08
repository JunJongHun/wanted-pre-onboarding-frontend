import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <div className="h-96 max-w-screen-md">
        <img
          className="h-full w-full object-cover"
          src="/frontendInternship.jpeg"
          alt="프리온보딩 이미지"
        />
      </div>

      <div className="flex">
        <button
          className="m-3  rounded-lg  bg-blue-600 p-3 text-white  hover:scale-110"
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입 하러가기
        </button>
        <button
          className="m-3 rounded-lg bg-blue-600 p-3 text-white  hover:scale-110"
          onClick={() => {
            navigate("/signin");
          }}
        >
          로그인 하러가기
        </button>
      </div>
    </div>
  );
}

export default Main;
