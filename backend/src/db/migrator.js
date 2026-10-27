import path from "path";
import { fileURLToPath } from "url";
import { SequelizeStorage, Umzug } from "umzug";
import { sequelize } from "./connection.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const migrator = new Umzug({
    migrations: {
        glob: ["migrations/*.{ts,js}", { cwd: __dirname }],
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize, tableName: "sequelize_meta" }),
    logger: console,
});
