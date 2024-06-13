import { useNavigate } from "react-router-dom";

export function ErrorComponent({ error }: { error: string }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-col items-center justify-center py-12 text-center">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-red-100 p-4 dark:bg-red-900">
          <TriangleAlertIcon className="h-8 w-8 text-red-500 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Oops, something went wrong!
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {error
            ? error
            : "We're sorry, but an unexpected error has occurred. Please try again later or contact support if the issue persists"}
        </p>
        <a
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:cursor-pointer hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          onClick={() => {
            // check if there is a previous page
            if (window.history.length > 2) {
              navigate(-1);
            } else {
              navigate("/articles");
            }
          }}
        >
          Go back to previous page
        </a>
      </div>
    </div>
  );
}

function TriangleAlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
