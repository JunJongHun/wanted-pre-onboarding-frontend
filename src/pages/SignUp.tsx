import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useValidate from "../hooks/useValidate";
import postSignUp from "../services/postSignUp";
import { InfoType } from "../types/info";
function SignUp() {
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
