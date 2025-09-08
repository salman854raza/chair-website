export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">The chair you&apos;re looking for has been reupholstered elsewhere.</p>
      <a href="/" className="mt-4 text-blue-500">Go Home</a>
    </div>
  );
}