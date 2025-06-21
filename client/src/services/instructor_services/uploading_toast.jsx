import { Loader } from "lucide-react";

export const UploadingToast = () => (
    <div className="flex items-center gap-2">
      <Loader className="animate-spin h-5 w-5 text-blue-500" />
      <span>Uploading...</span>
    </div>
  );