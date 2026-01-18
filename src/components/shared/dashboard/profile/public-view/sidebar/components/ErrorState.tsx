import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, User } from "lucide-react";

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <aside className="md:max-w-[300px] h-fit">
    <Card className="p-6 text-center space-y-4">
      <div className="w-12 h-12 bg-error-light rounded-full flex items-center justify-center mx-auto">
        <User className="w-6 h-6 text-error" />
      </div>
      <div>
        <h3 className="font-medium text-text-primary mb-1">
          Failed to load profile
        </h3>
        <p className="text-sm text-text-muted">
          Unable to fetch profile information
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        className="hover:bg-primary-50 hover:border-primary hover:text-primary"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Try Again
      </Button>
    </Card>
  </aside>
);
