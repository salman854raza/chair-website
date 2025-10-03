import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
// If your schema types are defined in './schemas/index.ts', update the import as follows:
import {schemaTypes} from './schemaTypes'

// Or, if you need to create './schemaTypes.ts', add the following file:
// h:\sanity-work\sanity\studio-shoes2-website\schemaTypes.ts
// export const schemaTypes = [];

export default defineConfig({
  name: 'default',
  title: 'shoes2-website',

  projectId: 'uazz9k5g',
  dataset: 'production',


  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
