import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Button, Container, Stack } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";

import { Schema } from "../types/schema";

import {
  useUserGenders,
  useUserLanguages,
  useUserSkills,
  useUserStates,
} from "../services/queries";
import RHFAutocomplete from "../../components/input/RHFAutocomplete";
import RHFToggleButtonGroup from "../../components/button/RHFToggleButtonGroup";
import RHFRadioGroup from "../../components/input/RHFRadioGroup";
import RHFCheckbox from "../../components/input/RHFCheckbox";
import RHFDateTimePicker from "../../components/input/RHFDateTimePicker";
import RHFDateRangePicker from "../../components/input/RHFDateRangePicker";
import RHFSlider from "../../components/control/RHFSlider";
import RHFSwitch from "../../components/control/RHFSwitch";
import RHFTextField from "../../components/input/RHFTextField";

export default function Users() {
  const statesQuery = useUserStates();
  const languagesQuery = useUserLanguages();
  const gendersQuery = useUserGenders();
  const skillsQuery = useUserSkills();
  const { control, unregister, reset } = useFormContext<Schema>();
  const isTeacher = useWatch({ control, name: "isTeacher" });
  const { append, remove, replace, fields } = useFieldArray({
    control,
    name: "students",
  });

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  const handleReset = () => {
    reset();
  }

  return (
    <Container maxWidth="sm" component="form" style={{ padding: "5dvh 0" }}>
      <Stack sx={{ gap: 2 }}>
        <RHFTextField<Schema> name="name" label="Name" />
        <RHFTextField<Schema> name="email" label="Email" />
        <RHFAutocomplete<Schema>
          name="states"
          label="States"
          options={statesQuery.data}
        />
        <RHFToggleButtonGroup<Schema>
          name="languagesSpoken"
          options={languagesQuery?.data}
        />
        <RHFRadioGroup<Schema>
          name="gender"
          label="Gender"
          options={gendersQuery?.data}
        />
        <RHFCheckbox<Schema>
          name="skills"
          label="Skills"
          options={skillsQuery?.data}
        />
        <RHFDateTimePicker<Schema>
          name="registrationDateAndTime"
          label="Registration Date & Time"
        />
        <RHFDateRangePicker<Schema>
          name="formerEmploymentPeriod"
          label="Former Employment Period:"
        />
        <RHFSlider<Schema> name="salaryRange" label="Salary Range" />
        <RHFSwitch<Schema> name="isTeacher" label="Are you a teacher?" />

        {isTeacher && (
          <Button type="button" onClick={() => append({ name: "" })}>
            Add New Student
          </Button>
        )}
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <RHFTextField name={`students.${index}.name`} label="Name" />
            <Button color="error" onClick={() => remove(index)}>
              Remove
            </Button>
          </Fragment>
        ))}
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button type="submit">New user</Button>
          <Button onClick={handleReset}>Reset</Button>
        </Stack>
      </Stack>
    </Container>
  );
}
