import { SERVER_URL } from "../config/serverURL";

export async function get_note(PATH_URL) {
  let token = localStorage.getItem("auth-token");
  const res = await fetch(`${SERVER_URL}${PATH_URL}`, {
    method: "GET",
    headers: { "x-auth-token": token },
  });
  const data = await res.json();

  return data;
}
