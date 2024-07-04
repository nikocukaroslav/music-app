function Button({children, onClick, clicked, className = "second-color", rounded = true}) {
    return (
        <button onClick={onClick}
                className={`p-2.5 ${rounded && "rounded-xl"} transition hover:hover-color ${className}
                ${clicked && "hover-color"}`}>
            {children}
        </button>
    );
}

export default Button;