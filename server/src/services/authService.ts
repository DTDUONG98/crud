import Base from "./baseService";
import auth from '@src/helpers/auth'

class AuthService extends Base {
  login = async ({
    username,
    password,
    otp,
    remember
  }: {
    username: string;
    password: string;
    otp?: string;
    remember?: boolean
  }) => {
    return this.request({
      url: "/api/v1/login",
      method: "POST",
      data: { username, password, otp,  remember},
    });
  };

  logout = async ({ username }: { username: string }) => {
    auth().logout();
    return this.request({
      url: "/api/v1/logout",
      method: "POST",
      data: { username },
    });
  };

  changePassword = async ({ password }: { password: string }) => {
    return this.request({
      url: "/api/v1/changePassword",
      method: "POST",
      data: { password },
    });
  };

  forgotPassword = async ({ data }: { data: { email: string } }) => {
    return this.request({
      url: "/api/v1/forgotPassword",
      method: "POST",
      data: data,
    });
  }

  checkToken = async ({ data }: { data: { token: string } }) => {
    return this.request({
      url: "/api/v1/checkToken/:token",
      method: "GET",
      data: data,
    });
  }

  resetPassword = async ({ data }: { data: { newPassword: string, token: string } }) => {
    return this.request({
      url: "/api/v1/resetPassword",
      method: "POST",
      data: data,
    });
  }
}

const service = () => new AuthService();
export default service;
