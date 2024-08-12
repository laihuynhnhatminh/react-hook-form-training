import { Typography } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  readonly name: Path<T>;
  readonly label: string;
};

export default function RHFDateRangePicker<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <>
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, ...restField } }) => (
          <DateRangePicker
            value={Array.isArray(value) ? value : [null, null]}
            {...restField}
          />
        )}
      />
    </>
  );
}
