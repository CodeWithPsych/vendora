"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/signin" })}
      className="mt-4 px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded"
    >
      Logout
    </button>
  );
}
