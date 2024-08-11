import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Schema } from "../types/schema";
import RHFAutocomplete from "../../components/input/RHFAutocomplete";

export default function Users() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutocomplete<Schema>
        name="states"
        label="States"
        options={[
          { id: "1", label: "California" },
          { id: "2", label: "Texas" },
        ]}
      />
    </Stack>
  );
}
