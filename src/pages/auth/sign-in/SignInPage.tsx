import React, {useState} from "react";
import logo from "../../../assets/logo.png";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useHttpRequestService} from "../../../service/HttpRequestService";
import AuthWrapper from "../AuthWrapper";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import {ButtonSize, ButtonType} from "../../../components/button/StyledButton";
import {StyledH3} from "../../../components/common/text";
import {useFormik} from "formik";
import {signInValidate} from "../../../util/validateForm";


interface SignInValues {
    email: string;
    password: string;
}
const SignInPage = () => {
  const [error, setError] = useState(false);


  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formik = useFormik<SignInValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: signInValidate,
        onSubmit: values => {
            httpRequestService
                .signIn(values)
                .then(() => navigate("/"))
                .catch(() => setError(true));
        }
  })

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt={"Twitter Logo"} />
            <StyledH3>{t("title.login")}</StyledH3>
          </div>
          <div className={"input-container"}>
            <LabeledInput
              required
              placeholder={"Enter email..."}
              title={t("input-params.email")}
              error={error || (!!formik.errors.email && formik.touched.email)}
              onChange={formik.handleChange}
              id={"email"}
              name={"email"}
              value={formik.values.email}
            />
              {formik.errors.email && formik.touched.email ? <p className={"error-message"}>{formik.errors.email}</p> : null}
            <LabeledInput
              type="password"
              required
              placeholder={"Enter password..."}
              title={t("input-params.password")}
              error={error || (!!formik.errors.password && formik.touched.password)}
              onChange={formik.handleChange}
              id={"password"}
              name={"password"}
              value={formik.values.password}
            />
              {formik.errors.password && formik.touched.password ? <p className={"error-message"}>{formik.errors.password}</p> : null}
            <p className={"error-message"}>{error && t("error.login")}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              text={t("buttons.login")}
              buttonType={ButtonType.FOLLOW}
              size={ButtonSize.MEDIUM}
              onClick={handleSubmit}
            />
            <Button
              text={t("buttons.register")}
              buttonType={ButtonType.OUTLINED}
              size={ButtonSize.MEDIUM}
              onClick={() => navigate("/sign-up")}
            />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignInPage;
