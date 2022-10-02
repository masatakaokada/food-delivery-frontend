import axios from "axios";
import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// 新しいユーザーを登録
export const registerUser = async (username, email, password) => {
  await axios
    .post(`${API_URL}/auth/local/register`, {
      username,
      email,
      password,
    })
    .then((res) => {
      Cookie.set("token", res.data.jwt, { expires: 7 });
      console.log(res.data.jwt);
    })
    .catch((err) => {
      console.log(err);
    });
};
