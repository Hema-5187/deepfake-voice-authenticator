const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">

      <label className="text-gray-300 text-sm">

        {label}

      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          rounded-xl
          bg-slate-800
          border
          border-slate-700
          px-4
          py-3
          text-white
          outline-none
          focus:border-blue-500
          transition-all
        "
      />

    </div>
  );
};

export default Input;