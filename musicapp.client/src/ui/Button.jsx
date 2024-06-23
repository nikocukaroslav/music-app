function Button({children, onClick, clicked, className}) {
    return (
        <button onClick={onClick}
                className={`second-color p-2.5 rounded-xl transition hover:hover-color ${className}
                ${clicked && "hover-color"}`}>
            {children}
        </button>
    );
}

export default Button;