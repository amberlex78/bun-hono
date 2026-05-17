import { useEffect, useState } from "react";
import { getProfile } from "../lib/api";

type User = { id: string; email: string; role: "regular" | "admin" };

export function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile()
      .then((data) => setUser(data.user))
      .catch(() => setError("Please log in"));
  }, []);

  return (
    <main className="container">
      <h1>Profile</h1>
      {error && <p>{error}</p>}
      {user && (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      )}
    </main>
  );
}
