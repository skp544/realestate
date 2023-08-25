import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

import { Footer, Header } from "../";
import UserDetailContext from "../../context/UserDetail";
import { createUser } from "../../utils/api";

const Layout = () => {
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();

  const { setUserDetails } = useContext(UserDetailContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegsiter = async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email",
        },
      });
      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));
      mutate(res);
    };

    isAuthenticated && getTokenAndRegsiter();
  }, [isAuthenticated]);

  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
