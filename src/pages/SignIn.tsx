import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useValidate from "../hooks/useValidate";
import postSignIn from "../services/postSignIn";
import { InfoType } from "../types/info";
import hasToken from "../utils/hasToken";
function SignIn() {
  //상태값
  const [info, setInfo] = useState<InfoType>({ email: "", password: "" });
  // 유효성 검사
  const [isEmail] = useValidate(info.email, /.*@.*/);
  const [isPassword] = useValidate(info.password, /.{8,}/);
  const [disabled, setDisabled] = useState(false);

  //라우팅
  const navigate = useNavigate();

  const onChangeInfo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((pre) => ({ ...pre, [name]: value }));
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      const { access_token } = await postSignIn(info);

      //로칼스토리지 토큰 저장
      localStorage.setItem("jwt", access_token);

      navigate("/todo");
    } catch (error) {
      if (axios.isAxiosError(error)) alert(error.response?.data.message);
      else console.error(error);
    }

    setInfo({ email: "", password: "" });
  }, [info]);

  useEffect(() => {
    if (hasToken()) navigate("/todo");
  }, []);

  useEffect(() => {
    setDisabled(!(isEmail && isPassword));
  }, [isEmail, isPassword]);

  return (
    <section className=" flex justify-center items-center">
      <div className="mt-12  max-w-fit flex flex-col">
        <div className="h-20">
          <input
            className="rounded-md border p-2"
            name="email"
            placeholder="이메일 입력해주세요."
            type="email"
            data-testid="email-input"
            value={info.email}
            onChange={onChangeInfo}
          />
          {!isEmail ? (
            <div className="ml-1 mt-1 text-sm text-red-500 opacity-75">
              이메일 형식이 맞지 않습니다.
            </div>
          ) : undefined}
        </div>
        <div className="h-20">
          <input
            className="rounded-md border p-2"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            data-testid="password-input"
            value={info.password}
            onChange={onChangeInfo}
          />
          {!isPassword ? (
            <div className="ml-1 mt-1 text-sm text-red-500 opacity-75">
              8글자 이상 입력해주세요
            </div>
          ) : undefined}
        </div>

        <button
          className="w-full rounded-full  bg-blue-600  p-2  text-white disabled:bg-slate-300  disabled:text-gray-400"
          data-testid="signin-button"
          onClick={onSubmit}
          disabled={disabled}
        >
          로그인
        </button>
      </div>
    </section>
  );
}

export default SignIn;
