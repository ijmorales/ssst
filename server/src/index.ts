import { load } from 'ts-dotenv';
import express from "express";
import { MikroORM } from '@mikro-orm/core';
import microConfig from './mikro-orm.config';
import { User } from "./entities/User";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { SolicitudFetcher } from "./classes/SolicitudFetcher";

const env = load({
  PORT: String,
  SSS_USER: String,
  SSS_RNOS: String,
  SSS_PW: String
});

const main = async () => {
  // Setup ORM
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const user = orm.em.create(User, { username: 'nach', password: '12345' });
  await orm.em.persistAndFlush(user);

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      em: orm.em
    })
  });
  apolloServer.applyMiddleware({ app });


  app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Now nodemon is working!');
  })

  app.get('/fetchSolicitudes', async (_, res) => {
    const fetcher = new SolicitudFetcher();
    await fetcher.auth({
      user: env.SSS_USER,
      rnos: env.SSS_RNOS,
      password: env.SSS_PW
    });
    await fetcher.fetchSolicitudes();
    res.send('fetching soliciud')
  })
  
  app.listen( 8080, () => {
    console.log(`Server started on localhost:${env.PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
});