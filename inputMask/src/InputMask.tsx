import { ReactElement, createElement, useCallback } from "react";

import { InputMaskContainerProps } from "../typings/InputMaskProps";
import { InputMaskInput } from "./components/InputMaskInput";
import "./ui/InputMask.css";

export function InputMask(props: InputMaskContainerProps): ReactElement {
    const { maskKey, replacementKey, showMaskKey, separateKey, valueKey, placeholderKey, onClickAction } = props;

    const onClickHandler = useCallback(() => {
        if (onClickAction?.canExecute && !onClickAction.isExecuting) {
            onClickAction.execute();
        }
    }, [onClickAction]);

    // The value attribute cannot be written while it is loading or when it is read-only.
    const readOnly = valueKey.status !== "available" || valueKey.readOnly;

    const handleChange = useCallback(
        (value: string) => {
            if (valueKey.status === "available" && !valueKey.readOnly) {
                valueKey.setValue(value === "" ? undefined : value);
            }
        },
        [valueKey]
    );

    return (
        <InputMaskInput
            id={props.id}
            tabIndex={props.tabIndex}
            value={valueKey.value ?? ""}
            maskKeyvalue={maskKey.value ?? ""}
            replacementKeyvalue={replacementKey.value ?? ""}
            showMaskKeyvalue={showMaskKey?.value === true}
            separateKeyvalue={separateKey?.value === true}
            placeholderKeyvalue={placeholderKey?.value || "Enter value"}
            readOnly={readOnly}
            validation={valueKey.validation}
            onClickAction={onClickAction ? onClickHandler : undefined}
            onChange={handleChange}
        />
    );
}
