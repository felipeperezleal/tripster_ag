import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	usuarioQueries,
	usuarioTypeDef,
	usuarioMutations,
	reservaQueries,
	reservaTypeDef,
	reservaMutations,
	routeTypeDef,
	routeQueries,
	routeMutations,
	flightQueries,
	flightTypeDef,
	countryMutations,
	loginMutations,
	loginTypeDef
} from './tripsterag/categories/typeDefs';

import usuarioResolvers from './tripsterag/categories/resolvers';


// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		usuarioTypeDef,
		reservaTypeDef,
		routeTypeDef,
		flightTypeDef,
		loginTypeDef
	],
	[
		usuarioQueries,
		reservaQueries,
		routeQueries,
		flightQueries
	],
	[
		usuarioMutations,
		reservaMutations,
		routeMutations,
		countryMutations,
		loginMutations
	],
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		usuarioResolvers
	)
});
