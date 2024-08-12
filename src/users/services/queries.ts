import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Option } from "../../types/option";

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
