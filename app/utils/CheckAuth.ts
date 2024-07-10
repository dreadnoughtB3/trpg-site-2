"use client"
import { jwtVerify } from "jose";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token){
        try {
          const secretKey = new TextEncoder().encode("for-the-emperor");
          jwtVerify(token, secretKey);
          router.push('/mypage')
        } catch (error) {}
      }
    };

    checkToken();
  }, [router]);
};

export default CheckAuth;