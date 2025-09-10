import sendResponseModule from "../modules/sendResponseModule.js";
import returnCsrftokenModule from "../modules/returnCsrftokenModule.js";
import returnCookieModule from "../modules/returnCookieModule.js";

import {
  logIn,
} from "../services/user.service.js";

export async function LogIn(req, res) {
  try {
    const { email, password } = req.body;
    const result = await logIn(email, password);
    req.session.csrfToken = result.meta.csrfToken;
    returnCsrftokenModule(result.meta.csrfToken, res);
    returnCookieModule(result.meta.token, res);
    sendResponseModule(res, result.data);
  } catch (error) {
    sendResponseModule(res, null, error);
  }
}