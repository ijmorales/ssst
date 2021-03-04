import path from "path";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import { User } from "./entities/User";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [User],
  type: "postgresql",
  debug: !__prod__,
  dbName: "ssst",
  user: "postgres",
  password: "postgres",
  host: "db"
} as Parameters<typeof MikroORM.init>[0];