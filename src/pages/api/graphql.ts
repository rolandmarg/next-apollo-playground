import { ApolloServer, ApolloError } from 'apollo-server-micro';
import { schema } from '../../apollo/schema';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../../lib/repository/User';
import { ensureConnection } from '../../lib/db';

export interface contextType {
  sessionToken: string;
  userRepository: UserRepository;
}

const context = async ({ req }: { req: MicroRequest }) => {
  const sessionToken = req.headers?.authorization?.split(' ')[1];

  //TODO optimize to open connection on demand
  //TODO move postgres to datasource
  //TODO better error handling

  try {
    await ensureConnection();
  } catch (e) {
    throw new ApolloError(`Could not connect to db: ${e}`);
  }

  const userRepository = getCustomRepository(UserRepository);

  return {
    sessionToken,
    userRepository,
  };
};

const apolloServer = new ApolloServer({
  schema,
  context,
  engine: {
    reportSchema: true,
  },
});

export default apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};
