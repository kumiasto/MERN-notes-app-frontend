import { SERVER_URL } from "../config/serverURL";

export async function get_note_details(PATH_URL, id) {
  let token = localStorage.getItem("auth-token");
  const res = await fetch(`${SERVER_URL}${PATH_URL}`, {
    method: "GET",
    headers: { "x-auth-token": token, "note-id": id },
  });

  const data = await res.json();

  return data;
}
