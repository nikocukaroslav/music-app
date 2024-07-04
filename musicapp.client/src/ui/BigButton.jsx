function BigButton({onClick, children, svg}) {
    return (
        <div
            onClick={onClick}
            className="p-2 min-w-64 second-color text-xl hover:hover-color transition flex gap-3 items-center">
            {svg}
            <span>{children}</span>
        </div>
    );
}

export default BigButton;