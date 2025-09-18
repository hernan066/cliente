// app/components/LoginSync.tsx
"use client";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0"; // <- IMPORT CLIENT
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import type { AppDispatch } from "../../store";

export default function LoginSync() {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isLoading) return;
    if (error) {
      console.error("useUser error:", error);
      return;
    }
    if (!user) return;

    (async () => {
      try {
        const res = await fetch("/auth/access-token");

        if (!res.ok) throw new Error("Token fetch failed: " + res.status);
        const { token } = await res.json();
        console.log(token);
        if (token) dispatch(setCredentials({ token, user }));
      } catch (e) {
        console.error("Error fetching access token", e);
      }
    })();
  }, [user, isLoading, error, dispatch]);

  return null;
}
