import { createSession, hashPassword, validatePassword } from '../lib/auth';
import { Resolvers } from '../__generated__/types';
import { ApolloError, UserInputError } from 'apollo-server-micro';
import { GraphQLScalarType, Kind } from 'graphql';

export const resolvers: Resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value; // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value); // ast value is always in string format
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
        throw new ApolloError('Email already taken');
      }

      const hash = await hashPassword(args.input.password);

      const user = await context.userRepository.save({
        email: args.input.email,
        password: hash,
      });

      if (!user) {
        throw new ApolloError('Interal server error');
      }

      return { user };
    },

    async signIn(_parent, args, context, _info) {
      const user = await context.userRepository.findOne({
        email: args.input.email,
      });
      if (!user) {
        throw new UserInputError('Invalid email or password');
      }

      const isValid = await validatePassword(
        args.input.password,
        user.password
      );
      if (!isValid) {
        throw new UserInputError('Invalid email or password');
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
  },
  User: {
    id: (user) => {
      return user.id.toString();
    },
  },
};
