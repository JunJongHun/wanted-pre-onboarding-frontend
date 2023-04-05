import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useValidate from "../hooks/useValidate";
import postSignUp from "../services/postSignUp";
import { InfoType } from "../types/info";
function SignUp() {
  //상태값
  const [info, setInfo] = useState<InfoType>({ email: "", password: "" });
  // 유효성 검사
  const [isEmail, setIsEmail] = useValidate(info.email, /.*@.*/);
  const [isPassword, setIsPassword] = useValidate(info.password, /.{8,}/);

  //라우팅
  const navigate = useNavigate();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setInfo((pre) => ({ ...pre, email }));
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setInfo((pre) => ({ ...pre, password }));
  };

  const onSubmit = async () => {
    try {
      await postSignUp(info);
      alert("정삭적으로 회원가입 완료!");
      navigate("/signin");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert("회원가입에 실패!");
      }
    }

    setInfo({ email: "", password: "" });
  };

  return (
    <div>
      <div>
        <input
          data-testid="email-input"
          placeholder="email"
          value={info.email}
          onChange={onChangeEmail}
        />
        {!isEmail ? <span>이메일 형식 X</span> : undefined}
      </div>
      <div>
        <input
          data-testid="password-input"
          placeholder="password"
          type="password"
          value={info.password}
          onChange={onChangePassword}
        />
        {!isPassword ? <span>비밀번호 8 자리 이상</span> : undefined}
      </div>

      <button
        data-testid="signup-button"
        onClick={onSubmit}
        disabled={!(isEmail && isPassword)}
      >
        회원가입
      </button>
    </div>
  );
}

export default SignUp;
