import LoginPage from "@/pages/auth/LoginPage";
import AuthLayout from "../layout/AuthLayout";
import RegisterPage from "@/pages/auth/RegisterPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import registerAction from "@/features/auth/actions/register-action";
import verifyEmailAction from "@/features/auth/actions/verify-email-action";
import verifyEmailLoader from "@/features/auth/loaders/verifyEmailLoader";
import loginAction from "@/features/auth/actions/login-action";

const authRoutes = {
  path: "/auth",
  Component: AuthLayout,
  errorElement: <div>404 Not Found</div>,
  children: [
    { path: "login", Component: LoginPage, action: loginAction },
    {
      path: "register",
      Component: RegisterPage,
      action: registerAction,
    },
    {
      path: "verify-email",
      Component: VerifyEmailPage,
      action: verifyEmailAction,
      loader: verifyEmailLoader,
    },
    { path: "forgot-password", Component: ForgotPasswordPage },
    { path: "reset-password", Component: ResetPasswordPage },
  ],
};

export default authRoutes;
