import { defineField, defineType } from "sanity";

export const featuredProjectsType = defineType({
  name: "featuredProjects",
  title: "Featured Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Project Description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Project Link",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Project Category",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Project Year",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "serialOrder",
      title: "Serial Order",
      type: "number",
      readOnly: true,
      initialValue: async (params, context) => {
        const { getClient } = context;
        const client = getClient({ apiVersion: '2023-01-01' });
        const result = await client.fetch('*[_type == "featuredProjects"] | order(serialOrder desc)[0].serialOrder');
        return (result || 0) + 1;
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      serialOrder: "serialOrder",
      media: "image",
    },
    prepare(select) {
      return {
        title: select.serialOrder + ". " + select.title,
        subtitle: select.subtitle,
        media: select.media,
      };
    },
  },
});
