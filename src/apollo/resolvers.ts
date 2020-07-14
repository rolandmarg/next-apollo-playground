import { GraphQLScalarType, Kind } from 'graphql';

import { createSession, hashPassword, validatePassword } from '../lib/auth';
import { Resolvers } from '../__generated__/types';
import { BadRequest, DatabaseError } from '../lib/error';

export const resolvers: Resolvers = {
  ISODate: new GraphQLScalarType({
    name: 'ISODate',
    description: 'ISO Timestamp',
    serialize(value) {
      return value instanceof Date ? value.toISOString() : null;
    },
    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
  Query: {
    async viewer(_parent, _args, context, _info) {
      const user = await context.userRepository.findOne(context.session?.id);
      if (!user) {
        return null;
      }

      return user;
    },
    async user(_parent, args, context) {
      const user = await context.userRepository.findOne(args.id);
      if (!user) {
        return null;
      }

      return user;
    },
    async users(_parent, _args, context) {
      const users = await context.userRepository.find();

      return users;
    },
    async calendarEvent(_parent, args, context) {
      const calendarEvent = await context.calendarEventRepository.findOne(
        args.id
      );
      if (!calendarEvent) {
        return null;
      }

      return calendarEvent;
    },
    async calendarEvents(_parent, _args, context) {
      const calendarEvents = await context.calendarEventRepository.find();

      return calendarEvents;
    },
  },
  Mutation: {
    async signUp(_parent, args, context, _info) {
      const exists = await context.userRepository.findOne({
        email: args.input.email,
      });
      if (exists) {
        throw new BadRequest('Email already taken');
      }

      const hash = await hashPassword(args.input.password);

      const user = await context.userRepository.save({
        email: args.input.email,
        password: hash,
      });

      if (!user) {
        throw new DatabaseError();
      }

      return { user };
    },

    async signIn(_parent, args, context, _info) {
      const user = await context.userRepository.findOne({
        email: args.input.email,
      });
      if (!user) {
        throw new BadRequest('Invalid email or password');
      }

      const isValid = await validatePassword(
        args.input.password,
        user.password
      );
      if (!isValid) {
        throw new BadRequest('Invalid email or password');
      }

      const token = await createSession({ id: user.id, createdAt: Date.now() });

      return { token, user };
    },

    async createCalendarEvent(_parent, args, context) {
      const calendarEvent = await context.calendarEventRepository.save({
        title: args.input.title,
        start: args.input.start,
        end: args.input.end,
      });

      return { calendarEvent };
    },
    async deleteCalendarEvents(_parent, _args, context) {
      const result = await context.calendarEventRepository.delete({});

      return !!result.affected;
    },
  },
};
