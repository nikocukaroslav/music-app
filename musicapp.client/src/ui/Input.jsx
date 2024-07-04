function Input({onChange, onClick, required, type}) {
    return (
        <input className="p-1 background-color outline outline-gray-600 text-gray-100 rounded w-full"
               required={required}
               onChange={onChange}
               onClick={onClick}
               type={type}
        />
    );
}

export default Input;