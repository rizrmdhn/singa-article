import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";
import { FieldConfig } from "./ui/auto-form/types";
import { Button } from "./ui/button";

export type DialogFormInputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    label: string;
    specialInput?: string;
    selectPlaceholder?: string;
    onChangeSelectValue?: (value: string) => void;
    valueSelect?: string;
    openCombobox?: boolean;
    setOpenCombobox?: React.Dispatch<React.SetStateAction<boolean>>;
    emptyComboboxWarning?: string;
    options?: { label: string; value: string }[];
  };

export type schemaValuesProps = {
  [key: string]: string | number | boolean | undefined | null | unknown;
};

type DialogFormProps<D extends z.ZodType<unknown, z.ZodTypeDef, unknown>> = {
  open: boolean;
  openChange: () => void;
  dialogTitle?: string;
  dialogDescription?: string;
  submitText?: string;
  schema: D;
  schemaValues:
    | FieldConfig<{
        [x: string]: string | number | boolean | undefined | null | unknown;
      }>
    | undefined;
  buttonState?: boolean;
  onSubmit: (data: z.infer<D>) => void;
};

export default function DialogForm({
  open,
  openChange,
  dialogTitle,
  dialogDescription,
  schema,
  schemaValues,
  buttonState,
  onSubmit,
}: DialogFormProps<z.ZodObject<z.ZodRawShape, z.UnknownKeysParam>>) {
  const handleClose = () => {
    openChange();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle || "No title provided"}</DialogTitle>
          <DialogDescription>
            {dialogDescription || "No description provided"}
          </DialogDescription>
        </DialogHeader>
        <AutoForm
          formSchema={schema}
          fieldConfig={schemaValues}
          onSubmit={onSubmit}
        >
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <AutoFormSubmit disabled={!schemaValues || buttonState}>
              Submit
            </AutoFormSubmit>
          </div>
        </AutoForm>
      </DialogContent>
    </Dialog>
  );
}
