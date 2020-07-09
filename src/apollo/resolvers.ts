import { encryptSession, decryptSession, Session } from '../lib/auth';
import { Resolvers } from '../__generated__/types';
import {
  AuthenticationError,
  ApolloError,
  UserInputError,
} from 'apollo-server-micro';

export const resolvers: Resolvers = {
  Query: {
    async viewer(_parent, _args, context, _info) {
      const session = await decryptSession(context.sessionToken);
      if (!session) {
        throw new AuthenticationError('Not authorized');
      }

      const user = await context.userRepository.findOne({
        email: session.email,
      });

      if (!user) {
        throw new AuthenticationError('Not authorized');
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
  },
  Mutation: {
    async signUp(_parent, args, context, _info) {
      const exists = await context.userRepository.findOne({
        email: args.input.email,
      });
      if (exists) {
        throw new UserInputError('Email already taken');
      }

      const hash = await context.userRepository.hashPassword(
        args.input.password
      );

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

      const isValid = await context.userRepository.validatePassword(
        args.input.password,
        user.password
      );
      if (!isValid) {
        throw new UserInputError('Invalid email or password');
      }

      const session: Session = {
        id: user.id,
        email: user.email,
        createdAt: Date.now(),
      };

      const token = await encryptSession(session);

      return { token, user };
    },
  },
  User: {
    id: (user) => {
      return user.id.toString();
    },
    email: (user) => {
      return user.email;
    },
    createdAt: (user) => {
      return user.createdAt.toString();
    },
  },
};
