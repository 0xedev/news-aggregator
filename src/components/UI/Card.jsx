export default function Card({ 
  children, 
  onClick, 
  className = '',
  hover = true,
  padding = true
}) {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden';
  const hoverClasses = hover ? 'transition-transform hover:scale-[1.02] hover:shadow-lg' : '';
  const paddingClasses = padding ? 'p-4' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const classes = `
    ${baseClasses}
    ${hoverClasses}
    ${paddingClasses}
    ${clickableClasses}
    ${className}
  `;
  
  return (
    <div 
      className={classes}
      onClick={onClick}
    >
      {children}
    </div>
  );
}