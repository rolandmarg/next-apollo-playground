import { ApolloServer } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { getRepository, Repository } from 'typeorm';

import { schema } from '../../apollo/schema';
import { ensureConnection } from '../../lib/db';
import { UserEntity } from '../../lib/entity/User';
import { CalendarEventEntity } from '../../lib/entity/CalendarEvent';
import { Session } from '../../lib/auth';
import { InternalServerError, AppError } from '../../lib/error';

export interface ContextData {
  req: MicroRequest;
  session?: Session;
  userRepository: Repository<UserEntity>;
  calendarEventRepository: Repository<CalendarEventEntity>;
}

const context = async ({ req }: { req: MicroRequest }) => {
  await ensureConnection();

  const userRepository = getRepository(UserEntity);
  const calendarEventRepository = getRepository(CalendarEventEntity);

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
  formatError: (error) => {
    const appError = error.originalError instanceof AppError;
    const production = process.env.NODE_ENV === 'production';

    if (production && !appError) {
      return new InternalServerError();
    }

    return error;
  },
});

export default apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};
