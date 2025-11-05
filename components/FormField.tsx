import { Controller, Control, FieldValues, Path } from "react-hook-form";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react"; 
import { useState } from "react";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => {

    const [showPassword, setShowPassword] = useState(false); 

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <div className="relative">
                <Input
                className="input"
                type={
                    type === "password" && !showPassword ? "password": "text"
                }
                placeholder={placeholder}
                {...field}
                />
                {type === "password" && (
                    <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
                    >
                    {showPassword ? (
                        <EyeOff className="mt-1 mr-2 w-7 h-5" />
                    ) : (
                        <Eye className="mt-1 mr-2 w-7 h-5" />
                    )}
                    </button>
                )}
              </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;