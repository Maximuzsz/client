// components/alert-error.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle } from "lucide-react";

interface ErrorAlertProps {
  description: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ description }) => (
  <Alert variant="destructive" className="flex items-center">
    <XCircle className="mr-2 h-5 w-5 text-red-600" />
    <div>
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </div>
  </Alert>
);
