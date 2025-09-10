import DataToDB from "../../../Client-ServerMethods/dataToDB";
import {
  LogInFunctionProps,
  RedirectToMainPageProps,
} from "../../../types/types";

const dataToDb = new DataToDB();

class LogInPageFunctions {

  redirectToMainPage({logInStatus,navigate} : RedirectToMainPageProps){
    if (logInStatus.status === "success") {
      const timeout = setTimeout(() => {
        navigate("/search");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }

  async logIn({
    logInData,
    setUserData,
    setIsLoggedIn,
    setLogInStatus,
    setIsLoading,
    setError,
  }: LogInFunctionProps) {
    if (!logInData.email || !logInData.password) {
      return setError("full in all fields");
    }
    setIsLoading(true);
    const request = await dataToDb.validateLogIn({
      data: logInData,
      setUserData,
      setIsLoggedIn,
    });
    console.log(request);
    if (request) {
      setIsLoading(false);
      return setLogInStatus("success");
    } else {
      setIsLoading(false);
      setError("Check that the data entered is correct");
      return setLogInStatus("fail");
    }
  }
  
}

export default LogInPageFunctions;
