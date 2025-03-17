export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
}) {
  const baseClasses =
    "font-medium rounded transition-colors focus:outline-none focus:ring-2";

  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-300",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300",
    outline:
      "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-300",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-300",
  };

  const sizeClasses = {
    sm: "text-sm px-3 py-1",
    md: "px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
