import axios from "axios";
import { useEffect, useState } from "react";
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

  //라우팅
  const navigate = useNavigate();

  const onChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((pre) => ({ ...pre, [name]: value }));
  };

  const onSubmit = async () => {
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
  };

  useEffect(() => {
    if (hasToken()) navigate("/todo");
  }, []);

  return (
    <div>
      <div>
        <input
          name="email"
          placeholder="email"
          data-testid="email-input"
          type="email"
          value={info.email}
          onChange={onChangeInfo}
        />
        {!isEmail ? <span>이메일 형식 X</span> : undefined}
      </div>
      <div>
        <input
          name="password"
          placeholder="password"
          data-testid="password-input"
          type="password"
          value={info.password}
          onChange={onChangeInfo}
        />
        {!isPassword ? <span>비밀번호 8 자리 이상</span> : undefined}
      </div>

      <button
        data-testid="signin-button"
        onClick={onSubmit}
        disabled={!(isEmail && isPassword)}
      >
        로그인
      </button>
    </div>
  );
}

export default SignIn;
