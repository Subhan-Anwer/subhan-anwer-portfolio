import { defineField, defineType } from "sanity";

export const personalDetailsType = defineType({
  name: "personalDetails",
  title: "Personal Details",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cv",
      title: "CV",
      type: "file",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "about",
      title: "About",
      type: "string",
      validation: (rule) => rule.required(),
    }),
      defineField({
        name: "happyClients",
        title: "Happy Clients",
        type: "number",
        validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mapLink",
      title: "Map Link",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      media: "profileImage",
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: select.subtitle,
        media: select.media,
      }
    }
  }
});