import { useState, type FormEvent } from "react";
import AuthShared from "../components/layout/auth-shared";
import { MdOutlineLock } from "react-icons/md";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential?.user;
      if (!user || user.email !== email) return;
      setSuccess(true);
      navigate("/dashboard");
      if (success) {
        toast.success("Logged in successfully!");
      }
      setLoading(false);
    } catch{
      if (error) {
        toast.error("Invalid email or password!");
      }
      setError(true);
      setLoading(false);
    }
  };
  return (
    <AuthShared>
      <div className="rounded-md bg-white shadow-md w-96 px-4 pb-4 pt-5">
        <form onSubmit={handleLogin}>
          <strong className="block py-1">Welcome back!</strong>
          <span className="text-[#BDBDBD] text-sm">
            Sign in to your account to continue
          </span>
          <div className="pt-3 relative ">
            <label htmlFor="email" className="block pb-1 text-sm">
              Email
            </label>
            <input
              type="email"
              className="w-full py-2 pl-7 bg-gray-100 rounded-md"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <MdOutlineEmail className="absolute left-2 top-12 text-gray-300" />
          </div>
          <div className="py-3 relative">
            <label htmlFor="password" className="block pb-1 text-sm">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full py-2 bg-gray-100 pl-7 rounded-md"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <MdOutlineLock className="absolute left-2 top-12 text-gray-300" />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <FiEyeOff className="absolute right-2 top-12 text-gray-300" />
              ) : (
                <FiEye className="absolute right-2 top-12 text-gray-300" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#66BB6A] text-white hover:bg-[#81C784] p-2 w-full rounded-md flex justify-center items-center"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin " />
            ) : (
              "  Sign in"
            )}
          </button>
          <button type="button" className="block text-center mx-auto py-2">
            {" "}
            <strong className="text-[#81C784]">Forgot password?</strong>
          </button>
          <div className="p-3 rounded-md bg-[#E8F3FF] text-blue-600 text-[12px]">
            <strong>Demo Account</strong>
            <span className="block">
              Use the pre-filled credentials to try the app with sample data.
            </span>
          </div>
        </form>
      </div>
    </AuthShared>
  );
};

export default Login;
