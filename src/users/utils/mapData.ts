import { ApiCreateEdit, ApiCommon } from "../types/apiTypes";
import { Schema } from "../types/schema";

export function mapData(data: Schema): ApiCreateEdit {
  const common: ApiCommon = {
    name: data.name,
    email: data.email,
    states: data.states,
    formerEmploymentPeriod: [
      data.formerEmploymentPeriod[0].toString(),
      data.formerEmploymentPeriod[1].toString(),
    ],
    registrationDateAndTime: data.registrationDateAndTime.toString(),
    gender: data.gender,
    languagesSpoken: data.languagesSpoken,
    skills: data.skills,
    salaryRange: [data.salaryRange[0], data.salaryRange[1]],
    isTeacher: data.isTeacher,
    students: data.isTeacher === true ? data.students : [],
  };

  switch (data.variant) {
    case "create": {
      return { ...common, variant: data.variant };
    }
    case "edit": {
      return { ...common, variant: data.variant, id: parseInt(data.id, 10) };
    }
  }
}
