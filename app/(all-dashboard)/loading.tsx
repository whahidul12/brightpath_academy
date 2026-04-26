export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-start justify-center">
      <div className="bg-card m-4 flex h-5/6 w-full flex-col items-center justify-center">
        {/* The Spinner */}
        <div className="border-card-foreground border-t-primary h-12 w-12 animate-spin rounded-full border-4"></div>

        {/* Supporting Text */}
        <p className="text-card-foreground/50 animate-pulse text-lg font-medium">
          Setting things up...
        </p>
      </div>
    </div>
  );
}
