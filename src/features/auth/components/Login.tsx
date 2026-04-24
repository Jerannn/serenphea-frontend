import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import {
  Link,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import logo from "@/assets/logo.png";
import type { LoginPayload } from "@/shared/types/auth-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/shared/schema/auth-schema";
import type { ErrorResponse } from "@/shared/types/response-types";

const initialValues: LoginPayload = {
  email: "sha@gmail.com",
  password: "sha123",
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const submit = useSubmit();
  const error = useActionData() as ErrorResponse | undefined;
  const navigation = useNavigation();
  const isLoggingIn = navigation.state === "submitting";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: initialValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginPayload) => {
    submit(data, { method: "post" });
  };

  return (
    <Card className="w-full xs:w-md gap-10 shadow-sm ring-0">
      <CardHeader className="flex flex-col items-center mt-5">
        <img src={logo} alt="Serenphéa logo" />

        <CardTitle>Log in to your account</CardTitle>
        <CardDescription className="text-center">
          Book stays, manage listings, and travel with ease
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10">
        <form onSubmit={handleSubmit(onSubmit)} id="login-form">
          {error && (
            <div className="mb-4 bg-destructive/10 p-3 rounded-md">
              <p className="text-destructive text-center">
                {error.message || "An error occurred. Please try again."}
              </p>
            </div>
          )}
          <FieldGroup>
            {/* email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  placeholder="john@example.com"
                  id="email"
                  {...register("email")}
                />
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            {/* password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                />
                <InputGroupAddon>
                  <LockKeyhole />
                </InputGroupAddon>
                <InputGroupAddon
                  align="inline-end"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? (
                    <Eye className="cursor-pointer" />
                  ) : (
                    <EyeOff className="cursor-pointer" />
                  )}
                </InputGroupAddon>
              </InputGroup>
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2 px-10">
        <Button
          className="w-full py-5"
          type="submit"
          form="login-form"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? <Loader2 className="mr-2 animate-spin" /> : "Login"}
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Don't have an account?
          <Link
            to="/auth/register"
            className="pl-1 text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
