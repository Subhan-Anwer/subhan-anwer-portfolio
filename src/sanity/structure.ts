import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio Content")
    .items([
      S.listItem()
        .title("Personal Details")
        .child(S.documentTypeList("personalDetails")),
      S.listItem().title("Tech Stack").child(S.documentTypeList("techStack")),
      S.listItem()
        .title("Featured Projects")
        .child(
          S.documentTypeList("featuredProjects")
            .title("Featured Projects")
            .defaultOrdering([{ field: "serialOrder", direction: "asc" }]),
        ),
      S.listItem().title("Code Stats").child(S.documentTypeList("codeStats")),
      S.listItem().title("Services").child(S.documentTypeList("services")),
    ]);
