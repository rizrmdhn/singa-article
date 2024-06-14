import "@/styles/load.css";

export function LoadingPage() {
  return (
    <div className="h-fillMaxScreen from-blue-primary via-blue-secondary to-blue-tertiary flex w-full items-center justify-center bg-gradient-to-br">
      <div className="loader"></div>
    </div>
  );
}
