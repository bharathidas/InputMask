import { ChangeEvent, ReactElement, createElement, useEffect, useMemo, useState } from "react";
import { InputMask } from "@react-input/mask";
import classNames from "classnames";

export interface InputMaskInputProps {
    id?: string;
    tabIndex?: number;
    value: string;
    maskKeyvalue?: string;
    placeholderKeyvalue?: string;
    replacementKeyvalue?: string;
    showMaskKeyvalue?: boolean;
    separateKeyvalue?: boolean;
    readOnly?: boolean;
    validation?: string;
    onClickAction?: () => void;
    onChange?: (value: string) => void;
}

// One rule: a key, a colon and either a /regular expression/ with optional flags or plain text up to the next comma.
const RULE = /\s*([^:,]+?)\s*:\s*(\/(?:\\.|\[(?:\\.|[^\]\\])*\]|[^/\\[])+\/[a-z]*|[^,]*)\s*(?:,|$)/y;

function toRegExp(source: string): RegExp | undefined {
    const match = source.match(/^\/(.+)\/([a-z]*)$/);
    try {
        return match ? new RegExp(match[1], match[2]) : new RegExp(source);
    } catch (e) {
        // A rule with an invalid regular expression is skipped, the other rules still work.
        return undefined;
    }
}

/**
 * Turns "_:/\d/, A:/[A-Z]/" into { _: /\d/, A: /[A-Z]/ }.
 * Commas and colons inside a /regular expression/ belong to that expression.
 */
export function parseReplacement(input: string): Record<string, RegExp> {
    const result: Record<string, RegExp> = {};
    RULE.lastIndex = 0;
    let rule = RULE.exec(input);
    while (rule) {
        const source = rule[2].trim();
        const expression = source ? toRegExp(source) : undefined;
        if (expression) {
            result[rule[1]] = expression;
        }
        if (RULE.lastIndex >= input.length) {
            break;
        }
        rule = RULE.exec(input);
    }
    return result;
}

export function InputMaskInput(props: InputMaskInputProps): ReactElement {
    const {
        value: propValue,
        maskKeyvalue,
        replacementKeyvalue,
        showMaskKeyvalue,
        separateKeyvalue,
        placeholderKeyvalue,
        readOnly,
        validation,
        onClickAction,
        onChange
    } = props;

    const [value, setValue] = useState<string>(propValue || "");

    // Follow the attribute when it is changed outside the widget.
    useEffect(() => {
        setValue(propValue || "");
    }, [propValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange?.(newValue);
    };

    const replacement = useMemo(() => parseReplacement(replacementKeyvalue || ""), [replacementKeyvalue]);

    return (
        <div
            className={classNames("widget-inputmask", { "widget-inputmask-clickable": !!onClickAction })}
            onClick={onClickAction}
        >
            <InputMask
                id={props.id}
                className="widget-inputmask-input"
                tabIndex={props.tabIndex}
                mask={maskKeyvalue}
                replacement={replacement}
                value={value}
                showMask={showMaskKeyvalue}
                separate={separateKeyvalue}
                onChange={handleChange}
                placeholder={placeholderKeyvalue}
                disabled={readOnly}
                aria-invalid={validation ? true : undefined}
            />
            {validation ? (
                <div className="alert alert-danger mx-validation-message" role="alert">
                    {validation}
                </div>
            ) : null}
        </div>
    );
}
