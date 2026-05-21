export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream text-navy p-6">
      <h1 className="text-4xl font-serif font-bold text-burgundy mb-4">404</h1>
      <p className="mb-8">This page is currently off the schedule.</p>
      <a href="/" className="bg-burgundy text-cream px-6 py-2 uppercase tracking-widest text-sm font-bold rounded-custom">Return Home</a>
    </div>
  );
}
