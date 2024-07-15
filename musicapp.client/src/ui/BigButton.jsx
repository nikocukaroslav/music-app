function BigButton({onClick, children, svg, className = "min-w-64"}) {
    return (
        <div
            onClick={onClick}
            className={`p-2 rounded-md main-color text-xl hover:hover-color 
      transition flex gap-3 items-center ${className} max-[764px]:min-w-[unset] max-[764px]:text-sm`}
        >
            {svg}
            <span>{children}</span>
        </div>
    );
}

export default BigButton;
