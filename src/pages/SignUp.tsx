import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignUp from "../services/postSignUp";
function SignUp() {
  //상태값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  //라우팅
  const navigate = useNavigate();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /.*@.*/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (password.length <= 8) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };

  const onSubmit = async () => {
    alert("회원가입 완료");

    try {
      await postSignUp({ email, password });
      navigate("/signin");
    } catch (error) {
      alert("이미 중복된 이메일입니다.");
    }

    setIsEmail(false);
    setIsPassword(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div>
        <input
          data-testid="email-input"
          placeholder="email"
          value={email}
          onChange={onChangeEmail}
        />
        {!isEmail ? <span>이메일 형식 X</span> : undefined}
      </div>
      <div>
        <input
          data-testid="password-input"
          placeholder="password"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        {!isPassword ? <span>비밀번호 8 자리 이상</span> : undefined}
      </div>

      <button
        data-testid="signup-button"
        onClick={onSubmit}
        disabled={isEmail && isPassword ? false : true}
      >
        회원가입
      </button>
    </div>
  );
}

export default SignUp;
