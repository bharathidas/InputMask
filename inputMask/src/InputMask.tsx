import { ReactElement, createElement, useCallback } from "react";

import { InputMaskContainerProps } from "../typings/InputMaskProps";
import { InputMaskInput } from "./components/InputMaskInput";
import "./ui/InputMask.css";

export function InputMask(props: InputMaskContainerProps): ReactElement {
    
    const {
        maskKey,
        replacementKey,
        showMaskKey,
        separateKey,
        valueKey,
        placeholderKey,
        onClickAction
    } = props;

    // Handle click action
    const onClickHandler = useCallback(() => {
        if (onClickAction && onClickAction.canExecute) {
            onClickAction.execute();
        }
    }, [onClickAction]);

    // Handle value change from child
    const handleChange = useCallback(
        (value: string) => {
            if (valueKey && valueKey.setValue) {
                
                valueKey.setValue(value);
            }
        },
        [valueKey]
    );

    // Optional validator (replacement for componentDidMount)
    if (valueKey && valueKey.setValidator) {
        valueKey.setValidator((value?: string) => {
            if (!value || value.trim() === "") {
                return "Value is required";
            }
            return undefined;
        });
    }

    return (
        <InputMaskInput
            value={valueKey.value?.toString() || "" }
            maskKeyvalue={maskKey.value?.toString() || "" }
            replacementKeyvalue={ replacementKey.value?.toString() || ""}
            showMaskKeyvalue={showMaskKey?.value || false}
            separateKeyvalue={separateKey?.value || false}
            placeholderKeyvalue={placeholderKey?.value || "Enter value"}
            onClickAction={onClickHandler}
            onChange={handleChange}   
        />
    );

}
