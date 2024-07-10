function CheckBox({ checked, onChange, className }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`appearance-none h-5 w-5 border-2 checkbox-border
        rounded checked:checkbox-background focus:outline-none hover:checkbox-background ${className}`}
    />
  );
}

export default CheckBox;
