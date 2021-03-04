import express from "express";
import "dotenv-safe/config";
import { MikroORM } from '@mikro-orm/core';
import microConfig from './mikro-orm.config';
import { User } from "./entities/User";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";

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
  
  app.listen(parseInt(process.env.PORT) || 8080, () => {
    console.log(`Server started on localhost:${process.env.PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
});