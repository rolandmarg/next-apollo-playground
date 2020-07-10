import { ApolloServer, ApolloError } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { getRepository, Repository } from 'typeorm';

import { schema } from '../../apollo/schema';
import { ensureConnection } from '../../lib/db';
import { User } from '../../lib/entity/User';
import { CalendarEvent } from '../../lib/entity/CalendarEvent';
import { Session } from '../../lib/auth';

export interface ContextData {
  req: MicroRequest;
  session?: Session;
  userRepository: Repository<User>;
  calendarEventRepository: Repository<CalendarEvent>;
}

const context = async ({ req }: { req: MicroRequest }) => {
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
    req,
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
  formatError: () => {
    // TODO better error handling
    return new Error('Interal Server Error');
  },
});

export default apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};
