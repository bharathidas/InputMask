import { ReactElement, createElement } from "react";

import { InputMaskPreviewProps } from "../typings/InputMaskProps";

// Design mode only knows the names of the selected attributes, not their values, so the mask cannot be applied here.
// The preview is a plain input box that shows which attribute stores the value.
export function preview(props: InputMaskPreviewProps): ReactElement {
    return (
        <div className="widget-inputmask">
            <div className="widget-inputmask-preview">{props.valueKey ? `[${props.valueKey}]` : "Input Mask"}</div>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/InputMask.css");
}
