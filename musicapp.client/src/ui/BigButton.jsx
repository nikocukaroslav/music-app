function BigButton({onClick, children, svg, className = "min-w-64"}) {
    return (
        <div
            onClick={onClick}
            className={`p-2 ${className} rounded-md second-color text-xl hover:hover-color transition flex gap-3 items-center`}>
            {svg}
            <span>{children}</span>
        </div>
    );
}

export default BigButton;