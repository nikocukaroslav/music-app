function Button({children, onClick, clicked, className = "second-color", rounded = true, padding = "2.5"}) {
    return (
        <button onClick={onClick}
                className={`p-${padding} ${rounded && "rounded-md"} transition hover:hover-color ${className}
                ${clicked && "hover-color"}`}>
            {children}
        </button>
    );
}

export default Button;