import { defineField, defineType } from "sanity";

export const logoAnimationType = defineType({
  name: "logoAnimation",
  title: "Logo Animation",
  type: "document",
  fields: [
    defineField({
      name: "logoTitle",
      title: "Logo Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logoImage",
      title: "Logo Image",
      type: "image",
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
        const result = await client.fetch('*[_type == "logoAnimation"] | order(serialOrder desc)[0].serialOrder');
        return (result || 0) + 1;
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "logoTitle",
      subtitle: "serialOrder",
      media: "logoImage",
      },
      prepare(select) {
          return {
                title: `${select.subtitle}. ${select.title}`,
                media: select.media,
          }
      }
  },
});