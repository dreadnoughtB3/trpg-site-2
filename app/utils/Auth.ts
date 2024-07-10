"use client"
import { jwtVerify, JWTPayload } from "jose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MyJWTPayload extends JWTPayload {
  discord: string;
  username: string;
  exp: number;
}

const Auth = () => {
  const [loginUser, setLoginUser] = useState({
    discord: "",
    exp: 0,
    username: "",
  });

  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/signin");
      } else {
        try {
          const secretKey = new TextEncoder().encode("for-the-emperor");
          const { payload } = await jwtVerify(token, secretKey);
          setLoginUser(payload as MyJWTPayload);

        } catch (error) {
          router.push("/signin");
        }
      }
    };

    checkToken();
  }, [router]);

  return loginUser;
};

export default Auth;