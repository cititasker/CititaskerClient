import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeaderNavigation() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="mb-6 px-0 text-primary hover:text-primary-600 hover:bg-transparent font-semibold"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to CitiTasker
    </Button>
  );
}
