import nextCookie from 'next-cookies'
import Cookies from 'universal-cookie';
import moment from 'moment';

export interface AuthInterface {
  token: string,
  cookies: Cookies,
  setAuth: Function,
  logout: Function,
  user: {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    permissions: any,
    groupId: number,
    roleGroupId: number,
    type: string;
  }
}

export default (context?: any): AuthInterface => {
  const cookiesObj = context ? nextCookie(context) : {}
  let cookies = new Cookies(cookiesObj);
  const token = cookies.get('token');
  const user = cookies.get('user') || {
    permissions: {}
  };

  const setAuth = ({ token, user }: AuthInterface) => {
    const options = {
      path: "/",
      //maxAge: 86400 * 365
      expires: moment().add(1, "years").toDate()
    }
    cookies.set('token', token, options)
    cookies.set('user', user, options)
  }

  const logout = () => {
    cookies.remove("token", {
      path: "/"
    })
    cookies.remove("user", {
      path: "/"
    })
  }

  return {
    token,
    user,
    cookies,
    setAuth,
    logout
  }
}
