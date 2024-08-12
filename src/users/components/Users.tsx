import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";

import { defaultValues, Schema } from "../types/schema";

import {
  useUser,
  useUserGenders,
  useUserLanguages,
  useUsers,
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
import { useCreateUser, useEditUser } from "../services/mutations";

export default function Users() {
  const statesQuery = useUserStates();
  const languagesQuery = useUserLanguages();
  const gendersQuery = useUserGenders();
  const skillsQuery = useUserSkills();
  const usersQuery = useUsers();
  const { control, unregister, reset, setValue, handleSubmit } =
    useFormContext<Schema>();
  const isTeacher = useWatch({ control, name: "isTeacher" });
  const userId = useWatch({ control, name: "id" });
  const variant = useWatch({ control, name: "variant" });
  const userQuery = useUser(userId);

  const createUserMutation = useCreateUser();
  const editUserMutation = useEditUser();

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

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

  const handleReset = () => {
    reset(defaultValues);
  };

  const handleUserClick = (id: string) => {
    setValue("id", id);
  };

  const handleNewUserForm = () => {
    reset(defaultValues);
  };

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (variant === "create") {
      createUserMutation.mutate(data);
    } else {
      editUserMutation.mutate(data);
    }
  };

  return (
    <Container
      maxWidth="sm"
      component="form"
      style={{ padding: "5dvh 0" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={userId === user.id}
              >
                <ListItemText>{user.label}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          <ListItemButton
            onClick={() => handleNewUserForm()}
            selected={variant === "create"}
          >
            <ListItemText>New</ListItemText>
          </ListItemButton>
        </List>

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
            <Button variant="contained" type="submit">
              {variant === "create" ? "New user" : "Edit user"}
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
