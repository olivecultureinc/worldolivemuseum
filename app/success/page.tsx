export default function SuccessPage(){
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl mb-4">Thank you!</h1>
      <p>Your Weekly Pass was granted (demo mode). Enjoy the museum.</p>

      <div className="mt-8">
        {/* This link sets the cookie on the server, then redirects to /museum */}
        <a className="underline" href="/api/demo-activate">Enter the Museum →</a>
      </div>
    </main>
  );
}
