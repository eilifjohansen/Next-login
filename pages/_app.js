import "tailwindcss/tailwind.css";
import App from "next/app";
import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";
import Layout from "../layouts/Layout";
import AppContext from "../context/AppContext";
import { RedirectLogin } from "../components";

// Protected paths
var authRoutes = ["/profile", "/cars", "/bookmarks"];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://login.apiblic.com";
class MyApp extends App {
  state = {
    user: null,
    isLoading: false,
    isAuthstatus: 0,
    isData: [],
    isCarsData: [],
  };

  componentDidMount() {
    const token = Cookie.get("token");

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          this.setIsAuthstatus(0);
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
        this.setIsAuthstatus(2);
        this.setIsData(user.links);
        this.setIsCarsData(user.cars);
      });
    }

    if (!token) {
      this.setIsAuthstatus(1);
    }
  }

  setUser = (user) => {
    this.setState({ user });
  };

  setIsAuthstatus = (isAuthstatus) => {
    this.setState({ isAuthstatus });
  };

  setIsData = (isData) => {
    this.setState({ isData });
  };

  setIsCarsData = (isCarsData) => {
    this.setState({ isCarsData });
  };

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          isAuthstatus: this.state.isAuthstatus,
          isData: this.state.isData,
          isCarsData: this.state.isCarsData,
          setUser: this.setUser,
          setIsAuthstatus: this.setIsAuthstatus,
          setIsData: this.setIsData,
          setIsCarsData: this.setIsCarsData,
        }}
      >
        {/* Return if user is loged in */}
        {authRoutes.indexOf(router.route) > -1 && (
          <>
            {this.state.isAuthstatus == 1 && <RedirectLogin />}
            {this.state.isAuthstatus == 2 && (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </>
        )}

        {/* Return if user is not loged in */}
        {authRoutes.indexOf(router.route) > -1 !== true && (
          <>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </>
        )}
      </AppContext.Provider>
    );
  }
}

export default MyApp;
