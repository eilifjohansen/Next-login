import Link from "next/link";
import React, { useState, useContext } from "react";
import { login } from "../../lib/auth";
import AppContext from "../../context/AppContext";

export default function Loginform(props) {
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setIsAuthstatus, setUser, setIsCarsData, setIsData } =
    useContext(AppContext);

  function onChange(event) {
    event.preventDefault();
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    data.identifier = e.target.identifier.value;
    data.password = e.target.password.value;
    setLoading(true);
    login(data.identifier, data.password)
      .then((res) => {
        setLoading(false);
        // set authed User in global context to update header/app state
        setUser(res.data.user);
        setIsData(res.data.user.links);
        setIsCarsData(res.data.user.cars);
        setIsAuthstatus(2);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setError(error.response.data);
        }
        setIsAuthstatus(1);
        setLoading(false);
      });
  };

  return (
    <div className="container flex mt-3 mb-16">
      <div className="max-w-md w-full ">
        <div className="bg-white border-t border-gray-200 rounded-lg overflow-hidden shadow-2xl">
          <div className="p-8">
            {Object.entries(error).length !== 0 &&
              error.constructor === Object &&
              error.message.map((error) => {
                return (
                  <div key={error.messages[0].id} style={{ marginBottom: 10 }}>
                    <small style={{ color: "red" }}>
                      {error.messages[0].message}
                    </small>
                  </div>
                );
              })}
            <form onSubmit={submitForm}>
              <div className="mb-5">
                <label
                  htmlFor="identifier"
                  className="block text-left mb-2 text-sm font-medium text-gray-600"
                >
                  Email
                </label>

                <input
                  onChange={(event) => onChange(event)}
                  name="identifier"
                  type="email"
                  className="block  text-left w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>

              <div className="mb-5">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block inline text-left mb-2 text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <Link href="/forgot-password">
                    <a className="block inline text-left mb-2 hover:underline text-sm font-medium text-blue-600">
                      Forgotten password?
                    </a>
                  </Link>
                </div>
                <input
                  onChange={(event) => onChange(event)}
                  type="password"
                  name="password"
                  className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 mt-4 bg-gray-800 hover:bg-gray-900 text-white rounded shadow"
              >
                {loading ? "Logging in... " : "Login"}
              </button>
            </form>

            <div className="mt-5 text-right">
              <Link href="/register">
                <a className="hover:underline text-blue-600  text-sm font-medium">
                  Create a user
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
