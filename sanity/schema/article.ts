export default {
  name: 'article',
  type: 'document',
  title: 'Article',
  fields: [
    { name: 'number', type: 'number', title: 'Article Number', validation: (R: any) => R.required().min(1) },
    {
      name: 'chapter',
      type: 'reference',
      to: [{ type: 'chapter' }],
      title: 'Chapter',
      validation: (R: any) => R.required(),
    },
    {
      name: 'title',
      type: 'object',
      title: 'Title',
      fields: [
        { name: 'en', type: 'string', title: 'English', validation: (R: any) => R.required() },
        { name: 'so', type: 'string', title: 'Somali', validation: (R: any) => R.required() },
      ],
    },
    {
      name: 'body',
      type: 'object',
      title: 'Body',
      fields: [
        { name: 'en', type: 'array', title: 'English', of: [{ type: 'block' }] },
        { name: 'so', type: 'array', title: 'Somali', of: [{ type: 'block' }] },
      ],
    },
  ],
  preview: {
    select: {
      number: 'number',
      chapterNumber: 'chapter->number',
      chapterTitleEn: 'chapter->title.en',
      titleEn: 'title.en',
    },
    prepare(selection: any) {
      const { number, chapterNumber, chapterTitleEn, titleEn } = selection;
      const chapterLabel = chapterTitleEn || (chapterNumber ? `#${chapterNumber}` : '{empty}');
      return {
        title: `Article ${number}${titleEn ? ` — ${titleEn}` : ''}`,
        subtitle: `Chapter: ${chapterLabel}`,
      };
    },
  },
};
