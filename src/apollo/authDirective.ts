import { SchemaDirectiveVisitor } from 'apollo-server-micro';
import {
  DirectiveLocation,
  GraphQLDirective,
  defaultFieldResolver,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLField,
} from 'graphql';

import { ContextData } from '../pages/api/graphql';
import { deserializeSession } from '../lib/auth';
import { AuthorizationError } from '../lib/error';

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
        const sessionToken = context.req.headers?.authorization;
        if (!sessionToken) {
          throw new AuthorizationError();
        }
        const session = await deserializeSession(sessionToken);

        return next(result, args, { ...context, session }, info);
      };
    });
  }

  public visitFieldDefinition(field: GraphQLField<any, ContextData>) {
    const next = field.resolve || defaultFieldResolver;
    field.resolve = async function (result, args, context, info) {
      const sessionToken = context.req.headers?.authorization;
      if (!sessionToken) {
        throw new AuthorizationError();
      }

      const session = await deserializeSession(sessionToken);

      return next(result, args, { ...context, session }, info);
    };
  }
}
