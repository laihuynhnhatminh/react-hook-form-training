import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";

type Props<T extends FieldValues> = {
  readonly name: Path<T>;
  readonly label: string;
};

export default function RHFDateTimePicker<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <DateTimePicker label={label} {...field} />}
    />
  );
}
