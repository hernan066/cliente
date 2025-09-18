// THIS IS EXAMPLE CODE ONLY AND WILL NOT USED IN OUR APPLICATION
import { getAccessToken } from "@auth0/nextjs-auth0";

export async function getTest() {
  const accessToken = await getAccessToken();

  const res = await fetch(`http://localhost:3040/api/auth/privado`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.json();
}
