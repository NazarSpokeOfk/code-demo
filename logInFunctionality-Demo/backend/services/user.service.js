import bcrypt from "bcrypt";
import crypto from "crypto";
import logger from "../winston/winston.js";

import generateJWT from "../cookies/generateJWT.js";

import returnUserInformationModule from "../modules/returnUserInformationModule.js";

import "../loadEnv.js"; // environment loader

export async function logIn(email, password) {
  try {
    const userResult = await mainPool.query(
      `SELECT email,username, other data FROM users WHERE email = $1`,
      [email]
    );

    if (userResult.rows.length === 0) {
      throw new Error("We can't find user");
    }

    let user = userResult.rows[0];

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Wrong password");
    }

    const token = generateJWT(user);

    const csrfToken = crypto.randomBytes(16).toString("hex");

    const userInformation = returnUserInformationModule(user, token, csrfToken);

    return {
      data: { userInformation },
      meta: { csrfToken, token },
    };
  } catch (error) {
    logger.error("Возникла ошибка в logIn:", error);
    throw new Error("Error during logging in.");
  }
}

async function comparePassword(inputPassword, storedHash) {
  return await bcrypt.compare(inputPassword, storedHash);
}
