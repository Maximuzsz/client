import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface SuccessAlertProps {
  description: string;
}

export function SuccessAlert({ description }: SuccessAlertProps) {
  return (
    <Alert variant="default" className="border-l-4 border-green-500 bg-green-50 text-green-700">
      <CheckCircle className="h-5 w-5 text-green-500" />
      <div className="flex flex-col ml-2">
        <AlertTitle>Sucesso</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </div>
    </Alert>
  );
}
