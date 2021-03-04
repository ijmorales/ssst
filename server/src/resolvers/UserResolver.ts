import { User } from "../entities/User";
import { MyContext } from "../types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { req, em }: MyContext) {
    console.log(req.headers);
    return em.find(User, {});
  }
}