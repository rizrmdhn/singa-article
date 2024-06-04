import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

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
  schemaValues: schemaValuesProps;
  data: DialogFormInputProps[];
  onSubmit: (data: z.infer<D>) => void;
};

export default function DialogForm({
  open,
  openChange,
  dialogTitle,
  dialogDescription,
  schema,
  schemaValues,
  data,
  onSubmit,
}: DialogFormProps<z.ZodObject<z.ZodRawShape, z.UnknownKeysParam>>) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: schemaValues,
  });

  const { reset } = form;

  const fileRef = form.register("image", { required: true });

  const onHandleSubmit = (data: z.infer<typeof schema>) => {
    onSubmit(data);
  };

  const handleClose = () => {
    openChange();
  };

  useEffect(() => {
    if (!open) {
      reset(schemaValues);
    }
  }, [open, reset, schemaValues]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle || "No title provided"}</DialogTitle>
          <DialogDescription>
            {dialogDescription || "No description provided"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onHandleSubmit)}>
              {data.map((data, index) => {
                // Assert that data.name is one of the expected keys
                const name = data.name as "title" | "description" | "image";
                return name === "image" ? (
                  <div key={index} className="flex flex-col gap-4">
                    <FormField
                      key={index}
                      control={form.control}
                      name={name}
                      render={() => (
                        <FormItem className="w-full space-y-1">
                          <FormLabel className="ml-1 font-bold">
                            {data.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              placeholder={data.placeholder}
                              disabled={data.disabled}
                              {...fileRef}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage className="text-xs">&nbsp;</FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  <div key={index} className="flex flex-col gap-4">
                    <FormField
                      key={index}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem className="w-full space-y-1">
                          <FormLabel className="ml-1 font-bold">
                            {data.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={data.placeholder}
                              {...field}
                              disabled={data.disabled}
                            />
                          </FormControl>
                          <FormMessage className="text-xs">&nbsp;</FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                );
              })}
              <div className="flex justify-end gap-5">
                <Button
                  className="ml-auto"
                  variant="outline"
                  onClick={() => {
                    setTimeout(() => {
                      reset(schemaValues);
                    }, 150);
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
