import * as React from "react";
import { Box, useColorMode } from "@chakra-ui/react";
import { Navigate, useParams } from "react-router-dom";
import Error from "../common/Error";
import Expired from "./Expired";
import Invalid from "./Invalid";
import UserNotFound from "./UserNotFound";
import AuthSuccess from "./AuthSuccess";
import ContentLoader from "./VerifyEmailContentLoader";
import { getCurrentUser } from "../../services/authService";
import { verifyEmail } from "../../services/authService";

type ParamTypes = {
  token: string;
};

const VerifyEmail = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const [isInValid, setInValid] = React.useState(false);
  const [hasExpired, setExpired] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
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
      setInValid(false);
      setExpired(false);
      setNotFound(false);

      try {
        const request = { token };

        await verifyEmail(request);
      } catch (ex: any) {
        if (!didCancel)
          if (ex.response && ex.response.status === 400) {
            const isExpire =
              ex.response.data === "Link has expired or already used.";

            const notFound = ex.response.data === "User not found.";

            if (isExpire) setExpired(true);
            else if (notFound) setNotFound(true);
            else setInValid(true);
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
            {isInValid ? (
              <Invalid
                to="/verify"
                heading="Invalid email verification link"
                text="email verification"
              />
            ) : (
              <>
                {hasExpired ? (
                  <Expired
                    to="/verify"
                    heading="Try verifying your email again"
                    text="verify your email"
                  />
                ) : (
                  <>
                    {notFound ? (
                      <UserNotFound />
                    ) : (
                      <>
                        {hasError ? (
                          <Error
                            onTryAgain={handleTryAgain}
                            text="An error occurred due to failing network. Check your internet connection and try again."
                          />
                        ) : (
                          <AuthSuccess
                            heading="Email Verified"
                            text="Your email has been verified, you can now sign in with your new account"
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
      </Box>
    </Box>
  );
};

export default VerifyEmail;
