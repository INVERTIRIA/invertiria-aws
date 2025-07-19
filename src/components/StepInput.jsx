import { cn } from "@/lib/utils";
const StepInput = ({ className, type, ...props }) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full border-b-2 border-gray-200 font-light transition-[color,box-shadow,border]",
        "focus-visible:outline-none focus-visible:border-invertiria-1",
        className
      )}
      {...props}
    />
  );
};

export default StepInput;
