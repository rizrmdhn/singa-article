import LoginForm from "@/components/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-3xl font-bold">
          Welcome to Singa Article Dashboard App
        </h1>
        <p className="text-lg">
          Please login to continue or go to article page
        </p>
        <p className="text-lg">
          click{" "}
          <a
            onClick={() => navigate("/articles")}
            className="text-blue-500 hover:cursor-pointer hover:text-blue-700 hover:underline"
          >
            here
          </a>{" "}
          to go to article page
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
