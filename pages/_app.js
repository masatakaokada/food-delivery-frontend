import React from "react";
import App from "next/app";
import Head from "next/head";
import Cookie from "js-cookie";
import Layout from "../components/layout";
import withData from "../lib/apollo";
import AppContext from "../context/AppContext";

class MyApp extends App {
  state = {
    user: null,
  };

  setUser = (user) => {
    this.setState({ user });
  };

  // すでにユーザーのクッキー情報が残っているか確認する
  componentDidMount() {
    const token = Cookie.get("token");

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          Cookie.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContext.Provider
        value={{ user: this.state.user, setUser: this.setUser }}
      >
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            />
          </Head>

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      </AppContext.Provider>
    );
  }
}

export default withData(MyApp);
