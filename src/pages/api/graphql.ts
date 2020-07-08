import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../apollo/schema';

const context = async () => {
  // const sessionToken = context.req.headers.authorization.split(' ')[1]
  // // simple auth check on every request
  // const auth = (req.headers && req.headers.authorization) || ''
  // const email = new Buffer(auth, 'base64').toString('ascii')
  // // if the email isn't formatted validly, return null for user
  // if (!isEmail.validate(email)) return { user: null }
  // // find a user by their email
  // const users = await store.users.findOrCreate({ where: { email } })
  // const user = users && users[0] ? users[0] : null
  // return { user }
};

const apolloServer = new ApolloServer({
  schema,
  context,
});

export default apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};
