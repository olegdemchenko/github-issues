import { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import githubUsernameRegex from 'github-username-regex';

import SignInForm from './SignInForm';

const errors = {
  incorrectUsername: "Username should correspond to GitHub requirements",
  incorrectRepository: "Repository should correspond to GitHub requirements",
  forbidden: "Maximum number of login attempts exceeded. Please try again later",
  invalidCredentials: "Username or repository is incorrect"
};

const SignIn = ({ signIn }) => {
  const [isFetching, setFetching] = useState(false);
  const usernameRef = useRef();
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      repository: '',
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
      .matches(/[-_.a-zA-Z0-9()$*-,=]+/, errors.incorrectRepository)
    }),
    onSubmit: async ({ username, repository }, { setErrors }) => {
      setFetching(true);
      try {
        const res = await axios.get(`https://api.github.com/repos/${username}/${repository}/issues`);
        setFetching(false);
        signIn();
        console.log(res.data);
      } catch (e) {
        setFetching(false);
        switch (true) {
          case (e.isAxiosError && e.response.status === 403): {
            setErrors({
              username: errors.forbidden,
              repository: errors.forbidden
            });
            return;
          }
          case (e.isAxiosError && e.response.status === 404): {
            setErrors({
              username: errors.invalidCredentials,
              repository: errors.invalidCredentials
            });
            return;
          }
          default:
            throw e;
        }
      }
    }
  });

  return <SignInForm formik={formik} inputRef={usernameRef} isFetching={isFetching}/>
};

export default SignIn;