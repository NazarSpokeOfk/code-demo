import logger from "../../winston/winston.js";
async function createTables(pool) {
  try {
    const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(50),
        PRIMARY KEY(user_id)
        )`;
    await pool.query(createUsersTable);
  } catch (error) {
    logger.error("Возникла ошибка в setup.js:", error);
  }
}
export default createTables;
