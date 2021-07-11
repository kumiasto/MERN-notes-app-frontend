import { SERVER_URL } from "../config/serverURL";

export async function search_note(PATH_URL, user, note) {
  const res = await fetch(`${SERVER_URL}${PATH_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "text/html",
      "user-id": user,
      "note-title": note,
    },
  });
  const data = await res.json();

  return data;
}
