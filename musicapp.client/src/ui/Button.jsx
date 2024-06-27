function Button({children, onClick, clicked, className = "second-color"}) {
    return (
        <button onClick={onClick}
                className={`p-2.5 rounded-xl transition hover:hover-color ${className}
                ${clicked && "hover-color"}`}>
            {children}
        </button>
    );
}

export default Button;