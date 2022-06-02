import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../assets/logo&img/logo.png";
import logoIcon from "../assets/logo&img/logo2.png";
import { Input, Button } from "../components/index";
import { LockClosedIcon } from "@heroicons/react/solid";
import { BsFacebook, BsGoogle, BsTwitter } from "react-icons/bs";
import { UserAuth } from "../utils/AuthContext";

export default function SignUp() {
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      first_name: "",
      last_name: "",
      street_address: "",
      region: "",
      city: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
      //first_name: Yup.string().required("Please enter your first name"),
      //last_name: Yup.string().required("Please enter your last name"),
      //street_address: Yup.string().required("Please enter your address"),
      //region: Yup.string().required("Please enter your region"),
      //city: Yup.string().required("Please enter your city"),
    }),
    onSubmit: async (values) => {
      try {
        await createUser(values.email, values.password);
        navigate("/account");
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center w-full p-4 bg-gray-50 shadow-sm">
        <img className="h-6 md:h-8 w-auto" src={logoIcon} alt="Locate Logo" />
      </div>
      <div className="mt-10 sm:mt-0 max-w-9xl py-20 flex justify-center space-x-20">
        <div className="space-y-6 max-w-md">
          <div>
            <img className="h-8 md:h-10 w-auto" src={logo} alt="Locate Logo" />
          </div>
          <p className="text-gray-500 text-sm">
            Locate offers you the possibility to find any lost object all for
            free
          </p>
          <ul className="list-disc flex flex-col list-inside space-y-2 pl-6">
            <li className="text-base font-bold flex-shrink">
              Have you lost an object?{" "}
              <Link
                to=""
                className="text-orange-600 hover:text-orange-700 text-base"
              >
                Visit the Found object page
              </Link>
            </li>
            <li className="text-base font-bold flex-shrink">
              <Link to="" className="text-orange-600 hover:text-orange-700">
                Explore Lost object page
              </Link>
            </li>
            <li className="text-base font-bold flex-shrink">
              <Link to="" className="text-orange-600 hover:text-orange-700">
                Learn more by visiting our page
              </Link>
            </li>
          </ul>
          <p className="text-gray-500 text-sm">
            By signing up for and signing in the service you accept our:{" "}
          </p>
          <ul className="list-disc flex flex-col list-inside space-y-2 pl-6">
            <li className="flex-shrink text-base">
              <Link
                to=""
                className="font-bold text-orange-600 hover:text-orange-700 "
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-5 md:mt-0">
          <form action="#" method="POST" onSubmit={formik.handleSubmit}>
            <div className="shadow-md overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      onChange={() => formik.handleChange}
                      onBlur={() => formik.handleBlur}
                      value={formik.values.first_name}
                      name="first_name"
                      type="text"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      onChange={() => formik.handleChange}
                      onBlur={() => formik.handleBlur}
                      value={formik.values.last_name}
                      name="last_name"
                      type="text"
                    />
                  </div>

                  <div className="col-span-6">
                    <Input
                      onChange={() => formik.handleChange}
                      onBlur={() => formik.handleBlur}
                      value={formik.values.email}
                      name="email"
                      type="email"
                    />
                  </div>

                  <div className="col-span-6">
                    <Input
                      onChange={() => formik.handleChange}
                      onBlur={() => formik.handleBlur}
                      value={formik.values.password}
                      name="password"
                      type="password"
                    />
                  </div>

                  <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="col-span-6">
                    <Input
                      onChange={() => formik.handleChange}
                      onBlur={() => formik.handleBlur}
                      value={formik.values.street_address}
                      name="street_address"
                      type="text"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      onChange={() => formik.handleChange}
                      onBlur={() => formik.handleBlur}
                      value={formik.values.city}
                      name="city"
                      type="text"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      onChange={() => formik.handleChange}
                      onBlur={() => formik.handleBlur}
                      value={formik.values.region}
                      name="region"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-6 px-4 py-3 bg-gray-50 text-right sm:px-6">
                <Button
                  placeholder="Sign up"
                  type="submit"
                  Icon={
                    <LockClosedIcon
                      className="h-5 w-5 text-orange-500 group-hover:text-orange-400"
                      aria-hidden="true"
                    />
                  }
                />
              </div>

              <div className="flex flex-col space-y-6 px-4 py-5 bg-white sm:p-6">
                <div className="flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>{" "}
                  <span className="flex-shrink mx-4 text-gray-500 text-sm">
                    Or continue with
                  </span>{" "}
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex flex-col space-y-6 w-full pb-6">
                  <button className="px-4 py-2 flex justify-center items-center border border-gray-300 rounded-md flex-grow">
                    <BsFacebook
                      className="text-gray-600"
                      onClick={() => {
                        /*Write the appopriate firebase function to sign in */
                      }}
                    />
                  </button>
                  <button className="px-4 py-2 flex justify-center items-center border border-gray-300 rounded-md flex-grow">
                    <BsGoogle
                      className="text-gray-600"
                      onClick={() => {
                        /*Write the appopriate firebase function to sign in */
                      }}
                    />
                  </button>
                  <button className="px-4 py-2 flex justify-center items-center border border-gray-300 rounded-md flex-grow">
                    <BsTwitter
                      className="text-gray-600"
                      onClick={() => {
                        /*Write the appopriate firebase function to sign in */
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
