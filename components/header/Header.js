import Link from "next/link";
import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { logout } from "../../lib/auth";
import { Transition } from "@headlessui/react";

import { MembersMenuData, PublicMenuData } from "..";

export default function Header(props) {
  const { user, setUser, setIsAuthstatus } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center w-full ">
              <div className="flex-shrink-0">
                <Link href="/">
                  <a className="text-2xl font-bold text-white">Login Project</a>
                </Link>
              </div>
              <div className="hidden md:flex md:flex-grow md:items-center w-full md:w-auto">
                <div className="md:mr-auto"></div>
                <div className="ml-10 flex items-baseline space-x-4">
                  {user ? (
                    <>
                      {MembersMenuData.map((item) => (
                        <Link href={item.href} key={item.id}>
                          <a className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                            {item.text}
                          </a>
                        </Link>
                      ))}
                      <button
                        className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => {
                          logout();
                          setIsAuthstatus(1);
                          setUser(null);
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      {PublicMenuData.map((item) => (
                        <Link href={item.href} key={item.id}>
                          <a className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                            {item.text}
                          </a>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              {/* Removed ref={ref} */}
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {user ? (
                  <>
                    {MembersMenuData.map((item) => (
                      <Link href={item.href} key={item.id}>
                        <a className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                          {item.text}
                        </a>
                      </Link>
                    ))}
                    <Link href="/">
                      <a
                        className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => {
                          logout();
                          setIsAuthstatus(1);
                          setUser(null);
                        }}
                      >
                        Logout
                      </a>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <a className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                        Login
                      </a>
                    </Link>
                    <Link href="/register">
                      <a className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                        Register
                      </a>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </>
  );
}
