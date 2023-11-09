import { classnames } from "../../utils/classnames";
import * as styles from "./style.css";

function defaultRenderOption<T>(option: T) {
  return <option key={`${option}`}>{`${option}`}</option>;
}

export type Props<T> = {
  className?: string;
  id?: string;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: T[];
  placeholder?: string;
  placeholderEnabled?: boolean;
  renderOption?: (o: T, idx: number) => JSX.Element;
  compact?: boolean;
  value?: string;
};

export function Select<T>({
  className,
  disabled,
  onChange,
  options,
  placeholder,
  placeholderEnabled,
  renderOption = defaultRenderOption,
  value,
}: Props<T>) {
  return (
    <select
      className={classnames(styles.baseSelect, className)}
      disabled={disabled}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    >
      {placeholder && (
        <option value="" disabled={!placeholderEnabled}>
          {placeholder}
        </option>
      )}
      {options.map(renderOption)}
    </select>
  );
}
