import React, {useState} from "react";
import logo from "../../../assets/logo.png";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import AuthWrapper from "../../../pages/auth/AuthWrapper";
import {useHttpRequestService} from "../../../service/HttpRequestService";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import {ButtonSize, ButtonType} from "../../../components/button/StyledButton";
import {StyledH3} from "../../../components/common/text";
import {useFormik} from "formik";
import {signUpValidate} from "../../../util/validateForm";
import InputElement from "../../../components/input/InputElement";
import {InputType} from "../../../components/input/StyledInputContainer";

interface SignUpData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpPage = () => {
  const [error, setError] = useState(false);

  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formik = useFormik<SignUpData>({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpValidate,
    onSubmit: (values: SignUpData) => {
      httpRequestService
        .signUp({
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
        })
        .then(() => navigate("/"))
        .catch(() => setError(true));
    },
  });

  const handleSubmit = async () => {
    formik.handleSubmit();
  };

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt="Twitter Logo" />
            <StyledH3>{t("title.register")}</StyledH3>
          </div>
          <div className={"input-container"}>
            <InputElement
              required
              placeholder={"Enter name..."}
              title={t("input-params.name")}
              error={error || (!!formik.errors.name && formik.touched.name)}
              onChange={formik.handleChange}
              id={"name"}
              name={"name"}
              value={formik.values.name}
              inputType={InputType.DEFAULT}/>
            {formik.errors.name && formik.touched.name ? <p className={"error-message"}> {formik.errors.name}</p> : null}
            <InputElement
              required
              placeholder={"Enter username..."}
              title={t("input-params.username")}
              error={error || (!!formik.errors.username && formik.touched.username)}
              onChange={formik.handleChange}
              id={"username"}
              name={"username"}
              value={formik.values.username}
              inputType={InputType.DEFAULT}
            />
            {formik.errors.username && formik.touched.username ? <p className={"error-message"}> {formik.errors.username}</p> : null}
            <InputElement
              required
              placeholder={"Enter email..."}
              title={t("input-params.email")}
              error={error || (!!formik.errors.email && formik.touched.email)}
              onChange={formik.handleChange}
              id={"email"}
              name={"email"}
              value={formik.values.email}
              inputType={InputType.DEFAULT}
            />
            {formik.errors.email && formik.touched.email ? <p className={"error-message"}> {formik.errors.email}</p> : null}
            <InputElement
              type="password"
              required
              placeholder={"Enter password..."}
              title={t("input-params.password")}
              error={error || (!!formik.errors.password && formik.touched.password)}
              onChange={formik.handleChange}
              id={"password"}
              name={"password"}
              value={formik.values.password}
              inputType={InputType.DEFAULT}
            />
            {formik.errors.password && formik.touched.password ? <p className={"error-message"}> {formik.errors.password}</p> : null}
            <InputElement
              type="password"
              required
              placeholder={"Confirm password..."}
              title={t("input-params.confirm-password")}
              error={error || (!!formik.errors.confirmPassword && formik.touched.confirmPassword)}
              onChange={formik.handleChange}
              id={"confirmPassword"}
              name={"confirmPassword"}
              value={formik.values.confirmPassword}
              inputType={InputType.DEFAULT}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? <p className={"error-message"}> {formik.errors.confirmPassword}</p> : null}
            <p className={"error-message"}>{error && t("error.register")}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              text={t("buttons.register")}
              buttonType={ButtonType.FOLLOW}
              size={ButtonSize.MEDIUM}
              onClick={handleSubmit}
            />
            <Button
              text={t("buttons.login")}
              buttonType={ButtonType.OUTLINED}
              size={ButtonSize.MEDIUM}
              onClick={() => navigate("/sign-in")}
            />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
