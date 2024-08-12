type Create = {
  variant: "create";
};

type Edit = {
  variant: "edit";
  id: number;
};

export type ApiCommon = {
  name: string;
  email: string;
  states: string[];
  languagesSpoken: string[];
  gender: string;
  skills: string[];
  registrationDateAndTime: string;
  formerEmploymentPeriod: [string, string];
  salaryRange: [number, number];
  isTeacher: boolean;
  students: {
    name: string;
  }[];
};

export type ApiCreateEdit = ApiCommon & (Create | Edit);
export type ApiGet = ApiCommon & Edit;
