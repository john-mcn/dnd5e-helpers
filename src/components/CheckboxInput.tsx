export function CheckboxInput<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T[];
  onChange: (value: T[]) => void;
}) {
  const toggleOption = (option: T) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...new Set([...value, option])]);
    }
  };

  return (
    <fieldset className="checkbox-group">
      <legend>{label}</legend>

      {options.map((option) => (
        <label key={option.value} className="checkbox-option">
          <input
            type="checkbox"
            checked={value.includes(option.value)}
            onChange={() => toggleOption(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}