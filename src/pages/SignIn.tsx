import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidateButton from "../components/ValidateButton";
import ValidateInput from "../components/ValidateInput";
import ValidateMessage from "../components/ValidateMessage";
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
  }, []);

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
        dataTestId="signin-button"
        onClick={onSubmit}
        disabled={disabled}
      >
        로그인
      </ValidateButton>
    </div>
  );
}

export default SignIn;
