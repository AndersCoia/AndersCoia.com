import SiteNav from "../components/SiteNav.jsx";

export default function About() {
  return (
    <>
    <SiteNav />
    <main className="basic">
        <h1>About</h1>
        <span className="break" aria-hidden="true"></span>
        <p>Write your about copy here.</p>
    </main>
    </>
  );
}