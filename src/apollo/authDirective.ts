import {
  DirectiveLocation,
  GraphQLDirective,
  defaultFieldResolver,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLField,
} from 'graphql';
import {
  SchemaDirectiveVisitor,
  AuthenticationError,
} from 'apollo-server-micro';
import { deserializeSession } from '../lib/auth';
import { ContextData } from '../pages/api/graphql';

export class AuthDirective extends SchemaDirectiveVisitor {
  public static getDirectiveDeclaration(
    directiveName: string,
    schema: GraphQLSchema
  ): GraphQLDirective {
    const previousDirective = schema.getDirective(directiveName);
    if (previousDirective) {
      return previousDirective;
    }

    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.OBJECT, DirectiveLocation.FIELD_DEFINITION],
    });
  }

  public visitObject(object: GraphQLObjectType<any, ContextData>) {
    const fields = object.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const next = field.resolve || defaultFieldResolver;

      field.resolve = async function (result, args, context, info) {
        const sessionToken = context.req.headers?.authorization?.split(' ')[1];
        if (!sessionToken) {
          throw new AuthenticationError('Unauthorized');
        }

        const session = await deserializeSession(sessionToken);

        return next(result, args, { ...context, session }, info);
      };
    });
  }

  public visitFieldDefinition(field: GraphQLField<any, ContextData>) {
    const next = field.resolve || defaultFieldResolver;
    field.resolve = async function (result, args, context, info) {
      const sessionToken = context.req.headers?.authorization?.split(' ')[1];
      if (!sessionToken) {
        throw new AuthenticationError('Unauthorized');
      }

      const session = await deserializeSession(sessionToken);

      return next(result, args, { ...context, session }, info);
    };
  }
}
