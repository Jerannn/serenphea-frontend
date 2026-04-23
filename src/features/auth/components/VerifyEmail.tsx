import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useAuthStore from "../auth.store";
import type { ErrorResponse } from "@/shared/types/response.types";
import type {
  VerifyCodePayload,
  VerifyEmailResponse,
} from "@/shared/types/auth.types";
import { verifyCodeSchema } from "@/shared/schema/auth.schema";

export default function VerifyEmail() {
  const [countdown, setCountdown] = useState(0);
  const otpSuccessData = useLoaderData() as VerifyEmailResponse;
  const otpErrorData = useLoaderData() as ErrorResponse;
  const otpActionData = useActionData() as ErrorResponse | undefined;
  const navigate = useNavigate();
  const submit = useSubmit();
  const navigation = useNavigation();
  const user = useAuthStore((state) => state.user);
  const expiresAt = otpSuccessData?.data?.expiresAt;
  const isSubmitting = navigation.state === "submitting";

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<VerifyCodePayload>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { otp: "" },
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (otpActionData?.status === "fail") {
      setError("otp", {
        message: otpActionData?.details
          ? otpActionData.details.otp
          : otpActionData.message,
      });
    } else if (otpErrorData?.status === "fail") {
      setError("otp", { message: otpErrorData.message });
    }
  }, [errors, otpActionData, otpErrorData, setError]);

  const onSubmit = (data: VerifyCodePayload) => {
    clearErrors();
    const payload = {
      email: user?.email || "",
      otp: data.otp,
    };

    submit(payload, { method: "post", action: "/auth/verify-email" });
  };

  useEffect(() => {
    if (!expiresAt) return;

    const expiry = new Date(expiresAt).getTime();

    const countdownInterval = setInterval(() => {
      const remaining = expiry - Date.now();
      setCountdown(Math.max(0, Math.floor(remaining / 1000)));
      if (remaining <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [expiresAt]);

  return (
    <Card className="w-full xs:w-md shadow-sm ring-0 p-10">
      <Button variant="link" className="w-fit p-0" onClick={() => navigate(-1)}>
        <ArrowLeft />
        Back
      </Button>
      <CardContent className="flex flex-col items-center p-0">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Check your email</h2>
        <p className="text-muted-foreground mb-8">
          We sent a verification code to <b>{user?.email}</b>
        </p>

        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field className="w-fit">
            <FieldLabel htmlFor="verify-code" className="justify-center">
              Enter verification code
            </FieldLabel>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  id="verify-code"
                  className="justify-center"
                  pattern={REGEXP_ONLY_DIGITS}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            {errors.otp && (
              <FieldError className="text-center">
                {errors.otp.message}
              </FieldError>
            )}
          </Field>

          <Button className="w-full mt-8" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Verify"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground mt-4 mb-1">
          Didn't receive the code?
        </p>
        {countdown > 0 ? (
          <p className="pt-2">Resend code in ({countdown}s)</p>
        ) : (
          <Button variant="link" className="w-fit p-0">
            Resend code
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
