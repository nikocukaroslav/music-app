function Button({children, onClick, clicked}) {
    return (
        <button onClick={onClick}
                className={`second-color p-3 rounded-xl transition hover:hover-color 
                ${clicked && "hover-color"}`}>{children}</button>
    );
}

export default Button;