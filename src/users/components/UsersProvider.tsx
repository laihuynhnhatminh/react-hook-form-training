import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Users from "./Users";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, schema, Schema } from "../types/schema";

export function UsersProvider() {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Users />
      <DevTool control={methods.control}/>
    </FormProvider>
  );
}
