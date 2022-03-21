import * as React from "react";
import { Box, useColorMode } from "@chakra-ui/react";
import { FormikState } from "formik";
import { Navigate, useParams } from "react-router-dom";
import Error from "../common/Error";
import Expired from "./Expired";
import Invalid from "./Invalid";
import UserNotFound from "./UserNotFound";
import ResetForm from "./PasswordResetForm";
import AuthSuccess from "./AuthSuccess";
import ContentLoader from "./PasswordResetContentLoader";
import { getCurrentUser } from "../../services/authService";
import { getPasswordEmail, resetPassword } from "../../services/authService";

type FormDataTypes = {
  password: string;
};

type ParamTypes = {
  token: string;
};

type FormikTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

const PasswordReset = () => {
  const [userEmail, setUserEmail] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const [initialInValid, setInitialInValid] = React.useState(false);
  const [nextInValid, setNextInValid] = React.useState(false);
  const [initialhasExpired, setInitialExpired] = React.useState(false);
  const [nextHasExpired, setNextExpired] = React.useState(false);
  const [initialNotFound, setInitialNotFound] = React.useState(false);
  const [nextNotFound, setNextNotFound] = React.useState(false);
  const [shouldReset, setReset] = React.useState(false);
  const [shouldTryAgain, setTryAgain] = React.useState(false);

  const { token } = useParams<ParamTypes>();
  const { colorMode } = useColorMode();
  const currentUser = getCurrentUser();

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      setTryAgain(false);
      setInitialInValid(false);
      setInitialExpired(false);
      setInitialNotFound(false);

      try {
        const { data } = await getPasswordEmail(token);
        setUserEmail(data);
        setReset(true);
      } catch (ex: any) {
        if (!didCancel)
          if (ex.response && ex.response.status === 400) {
            const inValid = ex.response.data === "Invalid token.";

            const notFound = ex.response.data === "Email not found.";

            const hasExpired =
              ex.response.data === "Link has expired or already used.";

            if (inValid) setInitialInValid(true);
            else if (hasExpired) setInitialExpired(true);
            else if (notFound) setInitialNotFound(true);
          } else setError(true);
      }

      if (!didCancel) setLoading(false);
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [token, shouldTryAgain]);

  const handleTryAgain = () => setTryAgain(true);

  const handleSubmit = async (formData: FormDataTypes, formik: FormikTypes) => {
    const { setSubmitting, resetForm } = formik;
    setSubmitting(true);

    try {
      const request = { password: formData.password, token };

      await resetPassword(request);

      resetForm();
      setReset(false);
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400) {
        const hasExpired =
          ex.response.data === "Link has expired or already used.";

        const notFound = ex.response.data === "Email not found.";

        if (hasExpired) setNextExpired(true);
        else if (notFound) setNextNotFound(true);
        else setNextInValid(true);
      }
    }
    setSubmitting(false);
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <Box as="section" px="4">
      <Box
        p="4"
        maxW="400px"
        mx="auto"
        borderRadius="md"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      >
        {isLoading ? (
          <ContentLoader />
        ) : (
          <>
            {initialInValid ? (
              <Invalid
                to="/password/recovery"
                heading="Invalid password reset link"
                text="password reset"
              />
            ) : (
              <>
                {initialhasExpired ? (
                  <Expired
                    to="/password/recovery"
                    heading="Try recovering your password again"
                    text="reset your password"
                  />
                ) : (
                  <>
                    {initialNotFound ? (
                      <UserNotFound />
                    ) : (
                      <>
                        {hasError ? (
                          <Error
                            onTryAgain={handleTryAgain}
                            text="An error occurred due to failing network. Check your internet connection and try again."
                          />
                        ) : (
                          <>
                            {shouldReset &&
                            !nextInValid &&
                            !nextHasExpired &&
                            !nextNotFound ? (
                              <ResetForm
                                userEmail={userEmail}
                                doSubmit={handleSubmit}
                              />
                            ) : (
                              <>
                                {nextInValid ? (
                                  <Invalid
                                    to="/password/recovery"
                                    heading="Invalid password reset link"
                                    text="password reset"
                                  />
                                ) : (
                                  <>
                                    {nextHasExpired ? (
                                      <Expired
                                        to="/password/recovery"
                                        heading="Try recovering your password again"
                                        text="reset your password"
                                      />
                                    ) : (
                                      <>
                                        {nextNotFound ? (
                                          <UserNotFound />
                                        ) : (
                                          <AuthSuccess
                                            heading="Password Changed"
                                            text="Your password has been updated, you can now sign in with your new
                                            password"
                                          />
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default PasswordReset;
