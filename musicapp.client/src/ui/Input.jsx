function Input({
  onChange,
  onClick,
  required,
  type,
  value,
  className,
  readOnly = false,
  placeholder,
}) {
  return (
    <input
      className={`p-1 background-color outline outline-color text-color rounded-md w-full ${className}`}
      required={required}
      onChange={onChange}
      onClick={onClick}
      type={type}
      value={value}
      readOnly={readOnly}
      placeholder={placeholder}
    />
  );
}

export default Input;
