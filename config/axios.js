"use client";
import axios from "axios";

const customInstance = axios.create({
  baseURL: "https://propertier-p2wwcx3okq-em.a.run.app",

  headers: {
    Accept: "application/json",
  },
});

export default customInstance;
