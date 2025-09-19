"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
  const [name, setName] = useState("");
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return;
    login(name);
    router.push("/dashboard");
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Official Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="block text-sm">Officer Name</label>
          <input
            className="w-full border rounded px-3 py-2 bg-transparent"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-foreground text-background text-sm"
        >
          Login
        </button>
      </form>
    </div>
  );
}


