import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { AuthDirective } from './authDirective';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuthDirective,
  },
});
