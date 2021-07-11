import { SERVER_URL } from "../config/serverURL";

export async function add_note(PATH_URL, title, content, user) {
  const res = await fetch(`${SERVER_URL}${PATH_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      content,
      user,
    }),
  });

  const data = res.json();

  return data;
}
