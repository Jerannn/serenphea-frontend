import LoginPage from "@/pages/auth/LoginPage";
import AuthLayout from "../layout/AuthLayout";
import RegisterPage from "@/pages/auth/RegisterPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import registerAction from "@/features/auth/actions/registerAction";

const authRoutes = {
  path: "/auth",
  Component: AuthLayout,
  errorElement: <div>404 Not Found</div>,
  children: [
    { path: "login", Component: LoginPage },
    {
      path: "register",
      Component: RegisterPage,
      action: registerAction,
    },
    { path: "verify-email", Component: VerifyEmailPage },
    { path: "forgot-password", Component: ForgotPasswordPage },
    { path: "reset-password", Component: ResetPasswordPage },
  ],
};

export default authRoutes;
