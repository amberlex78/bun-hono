import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <main className="container">
      <h1>Public Home</h1>
      <p>This page is available for unauthorized users.</p>
      <Link to="/profile">Go to profile</Link>
    </main>
  );
}
