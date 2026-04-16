import { ReactElement, useEffect, useState, createElement } from "react";
import { InputMask } from "@react-input/mask";

export interface InputMaskInputProps {
    value: string;
    maskKeyvalue?: string;
    placeholderKeyvalue?: string;
    replacementKeyvalue?: string;
    showMaskKeyvalue?: boolean;
    separateKeyvalue?: boolean;
    onClickAction?: () => void;
    onChange?: (value: string) => void; // 👈 added
}

export function InputMaskInput(props: InputMaskInputProps): ReactElement {
    const {
        value: propValue,
        maskKeyvalue,
        replacementKeyvalue,
        showMaskKeyvalue,
        separateKeyvalue,
        placeholderKeyvalue,
        onChange
    } = props;

    const [value, setValue] = useState<string>(propValue || "");

    // Sync with parent value
    useEffect(() => {
        setValue(propValue || "");
    }, [propValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange?.(newValue);
    };
function parseReplacement(input: string): Record<string, RegExp> {
  const result: Record<string, RegExp> = {};

  input.split(",").forEach(pair => {
    const [key, raw] = pair.split(":");

    if (!key || !raw) return;

    const trimmed = raw.trim();

    // Match /pattern/flags
    const match = trimmed.match(/^\/(.+)\/([gimsuy]*)$/);

    result[key.trim()] = match
      ? new RegExp(match[1], match[2])
      : new RegExp(trimmed);
  });

  return result;
}
let replacementParsevalue=parseReplacement(replacementKeyvalue || "");

 // 🔹 MODIFY → dynamic mask behavior
    const modify = () => {
    return {
        mask: maskKeyvalue || "",
        showMask: showMaskKeyvalue ?? false,
        separate: separateKeyvalue ?? false,
        replacement: replacementParsevalue
    };
};
    return (
        <div>
            <InputMask
        mask={maskKeyvalue}
        replacement={replacementParsevalue}
        value={value}
        showMask={showMaskKeyvalue}
        separate={separateKeyvalue}
        onChange={handleChange}
        placeholder={placeholderKeyvalue}
        modify={modify}
      />
        </div>
    );
}