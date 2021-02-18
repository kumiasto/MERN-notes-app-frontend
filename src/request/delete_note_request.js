import { SERVER_URL } from "../config/serverURL";

export async function delete_note(PATH_URL, id) {
  const res = await fetch(`${SERVER_URL}${PATH_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
    }),
  });
}
