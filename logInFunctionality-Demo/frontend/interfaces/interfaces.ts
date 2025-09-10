
export interface UserData {
  userInformation: {
    // 🤫
  };
}

export interface LogInData {
  email: string;
  password: string;
}

export interface LogInStatus {
  status : "success" | "error"
}
