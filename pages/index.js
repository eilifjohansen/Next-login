import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Layout from "../layouts/Layout";
import { HeaderTitle, Loading, IndexPage, Meta } from "../components";

export default function Members() {
  const { isAuthstatus } = useContext(AppContext);

  return (
    <>
      {isAuthstatus == 0 && <Loading />}
      {isAuthstatus == 1 && <IndexPage />}
      {isAuthstatus == 2 && (
        <Layout>
          <Meta title="Login Project" />
          <HeaderTitle title="Welcome" />
          <h1 className="pb-6">
            <div className="pb-6">
              Your are now loged in. Please take a look on the profile page.
            </div>
          </h1>
        </Layout>
      )}
    </>
  );
}
