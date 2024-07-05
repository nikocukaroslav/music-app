function CheckBox({checked, onChange}) {
    return (
        <input type="checkbox"
               checked={checked}
               onChange={onChange}
               className="appearance-none h-5 w-5 border-2 border-gray-500
                        rounded checked:bg-gray-500 focus:outline-none hover:bg-gray-500 "/>
    );
}

export default CheckBox;