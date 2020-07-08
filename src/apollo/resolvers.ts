import { encryptSession, decryptSession, Session } from '../lib/auth';
import { Resolvers } from '../__generated__/types';

export const resolvers: Resolvers = {
  Query: {
    async viewer(_parent, _args, context, _info) {
      const session = await decryptSession(context.sessionToken);
      if (!session) {
        return null;
      }

      const user = await context.userRepository.findOne({
        email: session.email,
      });

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
  },
  Mutation: {
    async signUp(_parent, args, context, _info) {
      const hash = await context.userRepository.hashPassword(
        args.input.password
      );

      const user = await context.userRepository.save({
        email: args.input.email,
        password: hash,
      });

      return { user };
    },

    async signIn(_parent, args, context, _info) {
      const user = await context.userRepository.findOne({
        email: args.input.email,
      });
      if (!user) {
        return {};
      }

      await context.userRepository.validatePassword(
        args.input.password,
        user.password
      );

      const session: Session = {
        id: user.id,
        email: user.email,
        creationTimestamp: Date.now(),
      };

      const token = await encryptSession(session);

      return { token, user };
    },
  },
  User: {
    id: (user) => {
      return user.id.toString();
    },
  },
};
