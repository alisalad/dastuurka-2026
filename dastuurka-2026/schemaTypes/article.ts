import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Article Number',
      type: 'number',
      validation: r => r.required().min(1),
    }),

    // ✅ Add slug so imported data matches schema (removes "Unknown field: slug")
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) =>
          `article-${String(doc.number).padStart(3, '0')}-${doc?.title?.en || doc?.title?.so || ''}`,
        maxLength: 96,
      },
    }),

    defineField({
      name: 'chapter',
      title: 'Chapter',
      type: 'reference',
      to: [{type: 'chapter'}],
      validation: r => r.required(),
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        defineField({name: 'so', title: 'Somali', type: 'string'}),
        defineField({name: 'en', title: 'English', type: 'string'}),
      ],
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'object',
      fields: [
        defineField({name: 'so', title: 'Somali', type: 'array', of: [{type: 'block'}]}),
        defineField({name: 'en', title: 'English', type: 'array', of: [{type: 'block'}]}),
      ],
    }),
  ],

  // ✅ Makes the Articles list readable and fixes the `{empty}` display
  preview: {
    select: {
      number: 'number',
      titleEn: 'title.en',
      titleSo: 'title.so',
      chapterNumber: 'chapter.number',
    },
    prepare({number, titleEn, titleSo, chapterNumber}: any) {
      const title = titleSo || titleEn || `Article ${number}`
      const ch = chapterNumber ? `Chapter ${chapterNumber}` : 'Chapter'
      return {
        title: `Article ${number}: ${title}`,
        subtitle: ch,
      }
    },
  },
})
