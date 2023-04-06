import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidateButton from "../components/ValidateButton";
import ValidateInput from "../components/ValidateInput";
import ValidateMessage from "../components/ValidateMessage";
import useValidate from "../hooks/useValidate";
import postSignUp from "../services/postSignUp";
import { InfoType } from "../types/info";
import hasToken from "../utils/hasToken";
function SignUp() {
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
  }, [info]);

  useEffect(() => {
    if (hasToken()) navigate("/todo");
  }, []);

  useEffect(() => {
    setDisabled(!(isEmail && isPassword));
  }, [isEmail, isPassword]);

  return (
    <div>
      <ValidateInput
        type="email"
        dataTestId="email-input"
        value={info.email}
        onChange={onChangeInfo}
      ></ValidateInput>
      <ValidateMessage isCheck={isEmail}>
        이메일 형식이 맞지 않습니다
      </ValidateMessage>
      <ValidateInput
        type="password"
        dataTestId="password-input"
        value={info.password}
        onChange={onChangeInfo}
      ></ValidateInput>
      <ValidateMessage isCheck={isPassword}>
        8글자 이상 적으셔야합니다
      </ValidateMessage>
      <ValidateButton
        dataTestId="signup-button"
        onClick={onSubmit}
        disabled={disabled}
      >
        회원가입
      </ValidateButton>
    </div>
  );
}

export default SignUp;
