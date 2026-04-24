import { type SchemaTypeDefinition } from "sanity";
import { personalDetailsType } from "./personalDetailsType";
import { codeStatsType } from "./codeStatsType";
import { techStackType } from "./techStackType";
import { servicesType } from "./servicesType";
import { featuredProjectsType } from "./featuredProjectsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    personalDetailsType,
    techStackType,
    codeStatsType,
    servicesType,
    featuredProjectsType,
  ],
};
