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
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Link,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { registerSchema } from "@/shared/schema/auth-schema";
import logo from "@/assets/logo.png";
import type { RegisterPayload } from "@/shared/types/auth-types";
import type { ErrorResponse } from "@/shared/types/response-types";

const initialValues: RegisterPayload = {
  fullName: "Sha",
  email: "sha@gmail.com",
  password: "sha123",
  confirmPassword: "sha123",
};

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();
  const submit = useSubmit();
  const error = useActionData() as ErrorResponse | undefined;
  const isSubmitting = navigation.state === "submitting";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterPayload>({
    defaultValues: initialValues,
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterPayload) => {
    submit(data, { method: "post", action: "/auth/register" });
  };

  useEffect(() => {
    if (error?.details) {
      Object.entries(error.details).forEach(([key, value]) =>
        setError(key as keyof RegisterPayload, { message: value }),
      );
    }
  }, [error, setError]);

  return (
    <Card className="w-full xs:w-md gap-10 shadow-sm ring-0">
      <CardHeader className="flex flex-col items-center mt-5">
        <img src={logo} alt="Serenphéa logo" />

        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Book stays, manage listings, and travel with ease
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10">
        <form onSubmit={handleSubmit(onSubmit)} id="register-form">
          <FieldGroup>
            {/* full name */}
            <Field>
              <FieldLabel htmlFor="fullName">Full name</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  placeholder="John Doe"
                  id="fullName"
                  {...register("fullName")}
                />
                <InputGroupAddon>
                  <User />
                </InputGroupAddon>
              </InputGroup>
              {errors.fullName && (
                <FieldError>{errors.fullName.message}</FieldError>
              )}
            </Field>

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

            {/* confirm password */}
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  placeholder="••••••••"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword")}
                />
                <InputGroupAddon>
                  <LockKeyhole />
                </InputGroupAddon>
                <InputGroupAddon
                  align="inline-end"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                >
                  {showConfirmPassword ? (
                    <Eye className="cursor-pointer" />
                  ) : (
                    <EyeOff className="cursor-pointer" />
                  )}
                </InputGroupAddon>
              </InputGroup>
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2 px-10">
        <Button
          className="w-full py-5"
          type="submit"
          form="register-form"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 animate-spin" />
          ) : (
            "Register"
          )}
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Already have an account?
          <Link to="/auth/login" className="pl-1 text-primary hover:underline">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
