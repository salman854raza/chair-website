import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagePath',
      title: 'Image Path',
      type: 'url', // Treating the image as an external URL
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text', // For multi-line descriptions
    }),
    defineField({
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'isFeaturedProduct',
      title: 'Is Featured Product',
      type: 'boolean',
    }),
    defineField({
      name: 'stockLevel',
      title: 'Stock Level',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
  ],
});