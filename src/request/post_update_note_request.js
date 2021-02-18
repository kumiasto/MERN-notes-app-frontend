import { SERVER_URL } from "../config/serverURL";

export async function update_note(PATH_URL, id, noteContent, noteTitle) {
  const res = await fetch(`${SERVER_URL}${PATH_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      content: noteContent,
      title: noteTitle,
    }),
  });

  const data = await res.json();

  return data;
}
