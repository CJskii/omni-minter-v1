import { LucideProps } from "lucide-react";

export function XIcon({ ...props }: LucideProps) {
  return (
    <svg
      width={16}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.06 14L7.162 9.686 3.535 14H2l4.481-5.328L2 2h3.94l2.731 4.066L12.093 2h1.535L9.354 7.082 14 14h-3.94zm1.709-1.216h-1.033L4.197 3.216h1.034l2.618 3.831.453.665 3.467 5.072z"
        fill="currentColor"
      />
    </svg>
  );
}
