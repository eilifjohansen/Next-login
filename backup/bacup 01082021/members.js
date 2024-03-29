import React, { useContext } from "react";
import Layout from "../layouts/Layout";
import AppContext from "../context/AppContext";
import { Loading, HeaderTitle, Meta, RedirectLogin } from "../components";

export default function Members() {
  const { user, isAuthstatus } = useContext(AppContext);

  return (
    <>
      {isAuthstatus == 0 && <Loading />}
      {isAuthstatus == 1 && <RedirectLogin />}
      {isAuthstatus == 2 && (
        <Layout>
          <Meta title="Login Project" />
          <HeaderTitle title="Members only" />
          <h1 className="pb-6">
            Members only should see this page. Your email is: {user.email}.
          </h1>
        </Layout>
      )}
    </>
  );
}
