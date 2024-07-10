function Button({
  children,
  onClick,
  clicked,
  className = "main-color",
  rounded = true,
  padding = "2.5",
  hoverColor = "hover-color",
}) {
  return (
    <button
      onClick={onClick}
      className={`p-${padding} ${rounded && "rounded-md"} transition hover:${hoverColor} ${className}
                ${clicked && "hover-color"}`}
    >
      {children}
    </button>
  );
}

export default Button;
