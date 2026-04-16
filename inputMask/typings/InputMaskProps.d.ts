/**
 * This file was generated from InputMask.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ActionValue, EditableValue } from "mendix";

export interface InputMaskContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    valueKey: EditableValue<string>;
    maskKey: EditableValue<string>;
    replacementKey: EditableValue<string>;
    showMaskKey?: EditableValue<boolean>;
    separateKey?: EditableValue<boolean>;
    placeholderKey?: EditableValue<string>;
    onClickAction?: ActionValue;
}

export interface InputMaskPreviewProps {
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    valueKey: string;
    maskKey: string;
    replacementKey: string;
    showMaskKey: string;
    separateKey: string;
    placeholderKey: string;
    onClickAction: {} | null;
}
