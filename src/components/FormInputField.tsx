import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { ComponentProps, ElementType } from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type FormInputFieldProps<T extends FieldValues> = {
  label: string;
  id: Path<T>;
  description?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  icon?: ElementType;
} & ComponentProps<typeof InputGroupInput>;

export default function FormInputField<T extends FieldValues>({
  label,
  id,
  description,
  icon: Icon,
  register,
  errors,
  ...props
}: FormInputFieldProps<T>) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputGroup className="border-border bg-white">
        <InputGroupInput
          id={id}
          {...props}
          {...register(id, { valueAsNumber: props.type === "number" })}
        />
        {Icon && (
          <InputGroupAddon>
            <Icon />
          </InputGroupAddon>
        )}
      </InputGroup>
      {description && <FieldDescription>{description}</FieldDescription>}
      {errors[id] && <FieldError>{errors[id]?.message as string}</FieldError>}
    </Field>
  );
}
