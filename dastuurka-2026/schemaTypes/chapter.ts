export default {
  name: "chapter",
  type: "document",
  title: "Chapter",
  fields: [
    {
      name: "number",
      type: "number",
      title: "Chapter Number",
      validation: (R: any) => R.required().min(1).max(15),
    },

    {
      name: "title",
      type: "object",
      title: "Title",
      fields: [
        {
          name: "en",
          type: "string",
          title: "English",
          validation: (R: any) => R.required(),
        },
        {
          name: "so",
          type: "string",
          title: "Somali",
          validation: (R: any) => R.required(),
        },
      ],
    },

    {
      name: "description",
      type: "object",
      title: "Short description",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "so", type: "string", title: "Somali" },
      ],
    },

    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: (doc: any) => {
          const n = String(doc?.number ?? "").padStart(2, "0");
          const enTitle = doc?.title?.en ?? "";
          return `ch-${n}-${enTitle}`;
        },
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, ""),
      },
      validation: (R: any) => R.required(),
    },
  ],

  preview: {
    select: {
      number: "number",
      en: "title.en",
      so: "title.so",
    },
    prepare({ number, en, so }: any) {
      const n = String(number ?? "").padStart(2, "0");
      return {
        title: `Chapter ${n} — ${en || "Untitled"}`,
        subtitle: so || "",
      };
    },
  },
};
