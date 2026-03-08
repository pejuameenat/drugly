import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../Firebase/auth-context";
import { User2Icon } from "lucide-react";
import { updateProfile } from "firebase/auth";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
const Settings = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState('')
  
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    if (user) {
      setDisplayName(user?.displayName);
      setEmail(user.email)
    }
  }, [user]);

  const queryClient = useQueryClient();
  const { mutate: updateSettings, isPending } = useMutation({
    mutationFn: async () => {
      await updateProfile(user, {
      displayName: displayName,
    });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Profile updated!");
    },
    onError: (err) => {
      console.error(err)
      toast.error("Failed to update profile");
    },
  });

  const handleProfileUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSettings();
  };
  return (
    <section className="lg:ml-58 pt-18 lg:pt-14 px-4 text-sm">
      <div className="py-5">
        <h2 className="text-2xl">Settings</h2>
        <span className="text-[#bdbdbd]">
          Manage your account and app preferences
        </span>
      </div>
      <div className="pt-5 pb-3 px-4 rounded-xl bg-white border border-gray-200">
        <strong className="flex items-center gap-1 font-medium">
          <User2Icon size={14} />
          Account
        </strong>
        <span className="text-[#bdbdbd]">Manage your account information</span>
        <form onSubmit={handleProfileUpdate}>
          <div className="pt-4">
            <label htmlFor="email">Email</label>
            <input
              className="w-full py-1 px-2 bg-gray-100 rounded-md cursor-not-allowed font-light"
              type="text"
              value={email}
              readOnly
              name="email"
              id="email"
            />
          </div>
          <div className="py-3">
            <label htmlFor="display-name">Display name</label>
            <input
              className="w-full py-1 px-2 bg-gray-100 rounded-md font-light"
              type="text"
              value={displayName}
              name="display-name"
              id="display-name"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="bg-[#141414] rounded-md px-2 py-1 text-white"
          >
            {isPending ? "Saving.." : "Save Profile"}
          </button>
        </form>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 mt-6">
        {/* <!-- Header --> */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg">
            🌍
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Units & Locale
            </h3>
            <p className="text-sm text-gray-500">
              Customize units and regional settings
            </p>
          </div>
        </div>

        {/* <!-- Blood Sugar Unit --> */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Blood Sugar Unit
          </label>
          <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>mg/dL (US)</option>
            <option>mmol/L (International)</option>
          </select>
        </div>

        {/* <!-- Timezone --> */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Timezone
          </label>
          <input
            type="text"
            value={userTimeZone}
            disabled
            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-600"
          />
          <p className="text-xs text-gray-500">Detected from your browser</p>
        </div>

        {/* <!-- Language --> */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Settings;
