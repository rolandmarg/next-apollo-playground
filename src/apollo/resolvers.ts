import { AuthenticationError, UserInputError } from 'apollo-server-micro';
import { createUser, findUser, validatePassword } from '../lib/user';
import { encryptSession, decryptSession, Session } from '../lib/auth';
import { Resolvers } from '../__generated__/types';

export const resolvers: Resolvers = {
  Query: {
    async viewer(_parent, _args, context, _info) {
      try {
        if (context.token) {
          const session = await decryptSession(context.token);
          if (session) {
            return findUser({ email: session.email });
          }
        }
      } catch (error) {
        throw new AuthenticationError(
          'Authentication token is invalid, please log in'
        );
      }
    },
  },
  Mutation: {
    async signUp(_parent, args, _context, _info) {
      const user = await createUser(args.input);
      return { user };
    },
    async signIn(_parent, args, _context, _info) {
      const user = await findUser({ email: args.input.email });

      if (user && (await validatePassword(user, args.input.password))) {
        const session: Session = {
          id: user.id,
          email: user.email,
        };

        const token = await encryptSession(session);

        return { token, user };
      }

      throw new UserInputError('Invalid email and password combination');
    },
  },
};
