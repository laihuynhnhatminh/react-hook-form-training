import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Option } from "../../types/option";
import { ApiGet } from "../types/apiTypes";
import { Schema } from "../types/schema";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: (): Promise<Option[]> =>
      axios.get<ApiGet[]>("http://localhost:8080/users").then((value) =>
        value.data.map<Option>((user) => ({
          id: user.id.toString(),
          label: user.name,
        }))
      ),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: async (): Promise<Schema> => {
      const { data } = await axios.get<ApiGet>(
        `http://localhost:8080/users/${id}`
      );

      return {
        variant: "edit",
        id: data.id.toString(),
        name: data.name,
        email: data.email,
        states: data.states,
        formerEmploymentPeriod: [
          new Date(data.formerEmploymentPeriod[0]),
          new Date(data.formerEmploymentPeriod[1]),
        ],
        registrationDateAndTime: new Date(data.registrationDateAndTime),
        gender: data.gender,
        languagesSpoken: data.languagesSpoken,
        skills: data.skills,
        salaryRange: [data.salaryRange[0], data.salaryRange[1]],
        isTeacher: data.isTeacher,
        students: data.students,
      };
    },
    enabled: !!id,
  });
}

export function useUserStates() {
  return useQuery({
    queryKey: ["states"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/states")
        .then((value) => value.data),
  });
}

export function useUserLanguages() {
  return useQuery({
    queryKey: ["languages"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/languages")
        .then((value) => value.data),
  });
}

export function useUserGenders() {
  return useQuery({
    queryKey: ["genders"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/genders")
        .then((value) => value.data),
  });
}

export function useUserSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/skills")
        .then((value) => value.data),
  });
}
