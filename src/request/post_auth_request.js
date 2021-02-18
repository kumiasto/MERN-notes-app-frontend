import { SERVER_URL } from "../config/serverURL";

export async function post_auth(PATH_URL, email, password) {
  const res = await fetch(`${SERVER_URL}/${PATH_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await res.json();

  return data;
}
