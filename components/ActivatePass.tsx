import ActivatePass from '../../components/ActivatePass';

export default function SuccessPage(){
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl mb-4">Thank you!</h1>
      <p>Your Weekly Pass was granted (demo mode). Enjoy the museum.</p>
      <ActivatePass />
      <div className="mt-8">
        <a href="/museum" className="underline">Enter the Museum →</a>
      </div>
    </main>
  );
}
