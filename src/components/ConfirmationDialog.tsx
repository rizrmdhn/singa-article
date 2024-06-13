import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export type DeleteAlertDialogProps = {
  className?: string;
  triggerText: string;
  alertTitle: string;
  alertDescription: string;
  buttonSize?: "default" | "sm" | "lg" | "icon";
  cancelText: string;
  continueText: string;
  onDeleteAction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function ConfirmationDialog({
  className,
  triggerText,
  alertTitle,
  alertDescription,
  cancelText,
  continueText,
  onDeleteAction,
}: DeleteAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={cn("w-full", className)}>
        <h1>{triggerText}</h1>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText ?? "Cancel"}</AlertDialogCancel>
          <AlertDialogAction onClick={(e) => onDeleteAction(e)}>
            {continueText ?? "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
