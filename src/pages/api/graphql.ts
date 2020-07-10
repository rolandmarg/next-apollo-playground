import { ApolloServer, ApolloError } from 'apollo-server-micro';
import { schema } from '../../apollo/schema';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { getRepository, Repository } from 'typeorm';

import { ensureConnection } from '../../lib/db';
import { User } from '../../lib/entity/User';
import { CalendarEvent } from '../../lib/entity/CalendarEvent';

export interface ContextData {
  sessionToken: string | undefined;
  userRepository: Repository<User>;
  calendarEventRepository: Repository<CalendarEvent>;
}

const context = async ({ req }: { req: MicroRequest }) => {
  const sessionToken = req.headers?.authorization?.split(' ')[1];

  //TODO optimize to open connection on demand
  //TODO move postgres to datasource

  try {
    await ensureConnection();
  } catch (e) {
    throw new ApolloError(`Could not connect to db: ${e}`);
  }

  const userRepository = getRepository(User);
  const calendarEventRepository = getRepository(CalendarEvent);

  const ctx: ContextData = {
    sessionToken,
    userRepository,
    calendarEventRepository,
  };

  return ctx;
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
