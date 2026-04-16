import { ReactElement, createElement } from "react";
import { InputMaskInput, InputMaskInputProps } from "./components/InputMaskInput";
import { InputMaskPreviewProps } from "../typings/InputMaskProps";

function parentInline(node?: HTMLElement | null): void {
    // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
    if (node && node.parentElement && node.parentElement.parentElement) {
        node.parentElement.parentElement.style.display = "inline-block";
    }
}

function transformProps(props: InputMaskPreviewProps): InputMaskInputProps {
    return {
     value: props.valueKey ? props.valueKey : "",
        maskKeyvalue: props.maskKey ? props.maskKey : "",
        replacementKeyvalue: props.replacementKey ? props.replacementKey : "",
        showMaskKeyvalue:  false,
        separateKeyvalue:  false,
        placeholderKeyvalue: props.placeholderKey ? props.placeholderKey : ""
    };
}

export function preview(props: InputMaskPreviewProps): ReactElement {
    return (
        <div ref={parentInline}>
            <InputMaskInput {...transformProps(props)}></InputMaskInput>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/InputMask.css");
}
