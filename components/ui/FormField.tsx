import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FormFieldBaseProps {
  label: string;
  error?: string;
  className?: string;
}

type InputProps = FormFieldBaseProps & InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  textarea?: false;
};

type TextareaProps = FormFieldBaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & {
  textarea: true;
};

export type FormFieldProps = InputProps | TextareaProps;

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, error, className, textarea, ...props }, ref) => {
    const baseInputStyles = cn(
      "w-full bg-paper border rounded-[2px] px-4 py-3 font-body text-base text-ink placeholder:text-slate/50 transition-shadow",
      "focus:outline-none focus:border-signal focus:ring-2 focus:ring-signal focus:ring-opacity-50",
      error ? "border-red-500" : "border-line"
    );

    return (
      <div className={cn("flex flex-col gap-2 w-full", className)}>
        <label className="font-mono text-xs uppercase tracking-[0.08em] text-slate">
          {label}
        </label>
        
        {textarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={cn(baseInputStyles, "min-h-[120px] resize-y")}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={baseInputStyles}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        
        {error && (
          <span className="font-mono text-xs text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
