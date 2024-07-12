function CheckBox({ checked, onChange, className, onClick }) {
  return (
    <input
      type="checkbox"
      onClick={onClick}
      checked={checked}
      onChange={onChange}
      className={`appearance-none h-5 w-5 border-2 checkbox-border
        rounded checked:checkbox-background focus:outline-none hover:checkbox-background ${className}`}
    />
  );
}

export default CheckBox;
