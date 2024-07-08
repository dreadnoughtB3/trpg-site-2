"use client";
import React, { useState, FormEvent } from "react";
import Header from "@/app/components/Header";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let flg = false;
  let msg = "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const jsondata = await response.json();

      flg = jsondata.flg;
      msg = jsondata.message;

      if (flg) {
        //成功したら、トークンを保存
        if ("token" in jsondata) {
          localStorage.setItem("token", jsondata.token);
          alert(msg);
        }
      } else {
        alert(msg);
      }
    } catch (error) {
      alert("ログイン失敗");
    }
  };

  return (
    <div>
      <Header />
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  );
};

export default Register;