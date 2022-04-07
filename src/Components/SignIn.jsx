import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import githubUsernameRegex from "github-username-regex";
import { Octokit } from "@octokit/core";

import SignInForm from "./SignInForm";

const errors = {
  incorrectUsername: "Username should correspond to GitHub requirements",
  incorrectRepository: "Repository should correspond to GitHub requirements",
  forbidden:
    "Maximum number of login attempts exceeded. Please try again later",
  invalidCredentials: "Username or repository is incorrect",
};

const SignIn = ({ signIn, setIssues, setUserData }) => {
  const [isFetching, setFetching] = useState(false);
  const usernameRef = useRef();
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      repository: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required()
        .trim()
        .matches(githubUsernameRegex, errors.incorrectUsername),
      repository: Yup.string()
        .required()
        .trim()
        .max(100)
        .matches(/[-_.a-zA-Z0-9()$*-,=]+/, errors.incorrectRepository),
    }),
    onSubmit: async ({ username, repository }, { setErrors }) => {
      setFetching(true);
      try {
        const octokit = new Octokit();
        //TODO Change count of issues downloading in one request after a pagination is implemented
        const { data } = await octokit.request(
          "GET /repos/{owner}/{repo}/issues?per_page=100",
          {
            owner: username,
            repo: repository,
          }
        );
        setFetching(false);
        signIn();
        setUserData({ username, repository });
        setIssues(data);
      } catch (e) {
        setFetching(false);
        switch (true) {
          case e.response.status === 403: {
            setErrors({
              username: errors.forbidden,
              repository: errors.forbidden,
            });
            return;
          }
          case e.response.status === 404: {
            setErrors({
              username: errors.invalidCredentials,
              repository: errors.invalidCredentials,
            });
            return;
          }
          default:
            throw e;
        }
      }
    },
  });

  return (
    <SignInForm
      formik={formik}
      inputRef={usernameRef}
      isFetching={isFetching}
    />
  );
};

export default SignIn;
