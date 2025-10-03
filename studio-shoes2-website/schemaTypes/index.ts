// import { type SchemaTypeDefinition } from 'sanity';
// import chef from './chef';
// import food from './foods';

// export const schema: { types: SchemaTypeDefinition[] } = {
//   types: [food, chef, require('./postType').postType, require('./event').eventType],
// };

import { SchemaTypeDefinition } from 'sanity';
import product from './product';


export const schemaTypes: SchemaTypeDefinition[] = [product];