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
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOffIcon, LockKeyhole, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <Card className="w-full xs:w-md">
      <CardHeader>
        <CardTitle>Create a new account</CardTitle>
        <CardDescription>Start your journey with us</CardDescription>
      </CardHeader>
      <FieldSeparator />
      <CardContent>
        <FieldGroup>
          {/* full name */}
          <Field>
            <FieldLabel htmlFor="fullname">Full name</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="John Doe" id="fullname" />
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
            </InputGroup>
            {/* <FieldError>Choose another username.</FieldError> */}
          </Field>

          {/* email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="john@example.com" id="email" />
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
            </InputGroup>
            {/* <FieldError>Choose another username.</FieldError> */}
          </Field>

          {/* password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup>
              <InputGroupInput
                placeholder="••••••••"
                type="password"
                id="password"
              />
              <InputGroupAddon>
                <LockKeyhole />
              </InputGroupAddon>
              <InputGroupAddon
                align="inline-end"
                onClick={() => console.log("CLICKED")}
              >
                <EyeOffIcon className="cursor-pointer" />
              </InputGroupAddon>
            </InputGroup>
            {/* <FieldError>Choose another username.</FieldError> */}
          </Field>

          {/* confirm password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <InputGroup>
              <InputGroupInput
                placeholder="••••••••"
                type="password"
                id="confirmPassword"
              />
              <InputGroupAddon>
                <LockKeyhole />
              </InputGroupAddon>
              <InputGroupAddon
                align="inline-end"
                onClick={() => console.log("CLICKED")}
              >
                <EyeOffIcon className="cursor-pointer" />
              </InputGroupAddon>
            </InputGroup>
            {/* <FieldError>Choose another username.</FieldError> */}
          </Field>
        </FieldGroup>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button className="w-full py-5">Register</Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?
          <Link to="/auth/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
