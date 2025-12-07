"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Une erreur critique est survenue</h1>
            <p className="text-muted-foreground mb-4">
              {process.env.NODE_ENV === "production"
                ? "Veuillez réessayer plus tard."
                : error.message}
            </p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
