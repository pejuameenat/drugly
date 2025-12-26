import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/config";
import AuthShared from "../components/layout/auth-shared";
import { MdOutlineLock } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const validateEmailFormat = (text: string) => {
    if (text && !text.includes("@")) {
      return;
    }
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential?.user, {
        displayName: fullName,
      });

      setSuccess(true);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      setError(true);
      toast.error("cant create user!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShared>
      <div className="rounded-md bg-white shadow-md w-96 px-4 pb-4 pt-5">
        <form onSubmit={handleSignup}>
          <strong className="block py-1">Create Account</strong>
          <span className="text-[#BDBDBD] text-sm">
            Sign up to start tracking your medications
          </span>
          <div className="pt-3 relative ">
            <label htmlFor="email" className="block pb-1 text-sm">
              Full Name
            </label>
            <input
              type="name"
              className="w-full py-2 pl-7 bg-gray-100 rounded-md"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <MdOutlineEmail className="absolute left-2 top-12 text-gray-300" />
          </div>
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
                validateEmailFormat(email);
              }}
            />
            <MdOutlineEmail className="absolute left-2 top-12 text-gray-300" />
            {email && !email.includes("@") && (
              <p className="text-red-600 text-[10px]">
                {" "}
                Email must contain '@'!
              </p>
            )}
          </div>
          <div className="pt-3 relative">
            <label htmlFor="password" className="block pb-1 text-sm">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full py-2 bg-gray-100 pl-7 rounded-md"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <div className="py-3 relative">
            <label htmlFor="confirm-password" className="block pb-1 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full py-2 bg-gray-100 pl-7 rounded-md"
              placeholder="Enter password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <MdOutlineLock className="absolute left-2 top-12 text-gray-300" />
            {confirmPassword && confirmPassword !== password && (
              <p className="text-red-600 text-[10px]">Passwords don't match!</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#66BB6A] hover:bg-[#81C784] text-white p-2 w-full rounded-md flex justify-center items-center"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin " />
            ) : (
              "Create Account"
            )}
          </button>

          <span className="block text-[10px]">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </span>
        </form>
      </div>
    </AuthShared>
  );
};

export default SignUp;
