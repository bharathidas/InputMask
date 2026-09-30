# Input Mask – Marketplace Documentation

Widget version 1.1.0 · Mendix Studio Pro 10.24.17 · Web (React client)

## Industry

All industries (cross-industry).

## Categories

- Widgets
- Input / Forms

## Component tagline

Text input with a mask for phone numbers, dates, IDs and your own formats.

(74 characters)

## About

Input Mask is a text input that only accepts characters that fit a mask. The mask fixes the format of the text, for example `+91 _____ _____` for a phone number or `dd/mm/yyyy` for a date. The fixed characters of the mask are added for the user, and characters that do not fit are refused. It is built on the @react-input/mask library.

The mask, the rules for the mask characters, the placeholder and two options come from attributes of the context object, so they can differ per object and can change while the page is open. The text is stored in a String attribute exactly as it is shown in the input.

Version 1.1.0 is rebuilt for Mendix Studio Pro 10.24.17 and the React client. It fixes several problems of version 1.0.0: the input can be cleared, a regular expression may contain commas and colons, an invalid regular expression no longer breaks the widget, the On click action runs, a read-only attribute gives a disabled input, and the validation message of the attribute is shown. The package is about 20 KB.

The source code is on GitHub: https://github.com/bharathidas/InputMask

## Typical usage scenario

- Phone numbers with a fixed country code and grouping.
- Dates or times typed in a fixed format.
- Codes with letters and digits, such as `AB-123`.
- Any other text with a fixed length and fixed separators.

## Features and limitations

**Features**

- Mask from a String attribute, for example `+91 _____ _____`.
- Rules per mask character as regular expressions, for example `_:/\d/` or `A:/[A-Za-z]/,9:/[0-9]/`.
- Show mask: the rest of the mask stays visible while the user types.
- Separate: typed characters keep their position when a character in the middle is deleted.
- Placeholder from a String attribute.
- Label, editability and visibility settings as for a text box.
- On click action.
- Shows the validation message of the value attribute.
- Mask, rules, placeholder and options can change while the page is open.
- Offline capable.

**Limitations**

- Web only; not available for native mobile.
- The settings are attributes; static values cannot be typed in the widget properties.
- The widget needs a context object, so it must be inside a data view or list view.
- The value is stored with the fixed mask characters. There is no second value without them.
- A value that is set outside the widget is shown as it is; it is not reformatted to the mask.
- The widget does not check that the mask is completely filled.
- The input has the browser's own look, not the Atlas input style. Style it with the CSS class `widget-inputmask-input`.

## Dependencies

- Mendix Studio Pro 10.24.17. Later versions were not tested.
- No other modules or libraries are needed.

## Installation

1. Download `mendix.InputMask.mpk` from the Marketplace (or from the GitHub release Version1.1.0).
2. Copy it into the `widgets` folder of your app (App > Show App Directory in Explorer).
3. In Studio Pro, press F4 (App > Synchronize App Directory).
4. The widget appears in the Toolbox as **Input Mask**.

**Upgrading from 1.0.0:** replace the file in the `widgets` folder and press F4. Studio Pro reports that the widget definition changed; right-click the error and choose **Update all widgets**. Your settings are kept. If the running app still shows the old widget, choose App > Clean Deployment Directory and run the app again. Note that the value attribute can now become empty when the user clears the input, and that a configured On click action now runs.

## Configuration

1. Add three String attributes to your entity: one for the value, one for the mask and one for the replacement rules.
2. Optionally add Boolean attributes for show mask and separate, and a String attribute for the placeholder.
3. Set the mask and the replacement when the object is created, for example in the data source microflow of the data view, or with attribute default values.
4. Place the widget in a data view of that entity.
5. Double-click the widget and select the attributes.

Mask and replacement: the mask is the full format of the text. The replacement says which characters of the mask are places where the user types, and which characters are allowed there. Write it as `character:/regular expression/` and separate more rules with commas. Every other character of the mask is fixed text.

| Use | Mask | Replacement | Typed | Result |
| --- | --- | --- | --- | --- |
| Phone number | `+91 _____ _____` | `_:/\d/` | 9876543210 | +91 98765 43210 |
| Date | `dd/mm/yyyy` | `d:/\d/,m:/\d/,y:/\d/` | 25122026 | 25/12/2026 |
| Letters and digits | `AA-999` | `A:/[A-Za-z]/,9:/[0-9]/` | 1ab2345 | ab-234 |
| Letters, any case | `___` | `_:/[a-z]/i` | aB1c | aBc |

Show mask: when true, the places that are not filled yet are shown with the mask character, for example `+91 987__ _____`. The mask appears when the user types the first character.

Separate: when true, deleting a character in the middle leaves its place empty (`+91 98_65 43210`). When false, the characters after it move to the left.

Placeholder: when the attribute is empty or not selected, the text "Enter value" is shown.

## Known bugs

- With Show mask true, the stored value contains the mask characters of the places that are not filled. When the user deletes everything, the empty mask (for example `+91 _____ _____`) is stored, not an empty value.
- With an empty mask or an empty replacement nothing can be typed.
- A value that does not fit the mask (for example set by a microflow) is shown as it is.

## FAQ

**Why can I not type anything?**
The mask or the replacement is empty, or the replacement rule is not valid. Check that the replacement names a character that is in the mask, for example `_:/\d/` for the mask `__-__`.

**How do I get the value without the mask characters?**
The widget stores the text as shown. Remove the fixed characters in a microflow or nanoflow, for example with the `replaceAll` function.

**How do I make the value mandatory?**
Version 1.1.0 no longer refuses an empty value by itself. Add a validation rule to the entity or check the value in your save microflow. The validation message is shown below the input.

**Can I use a comma in a regular expression?**
Yes, from version 1.1.0, when the expression is written between slashes, for example `_:/\d{1,2}/` or `_:/[a,b]/`.

**Can I type the mask directly in the widget properties?**
No. The mask comes from an attribute. Give the attribute a default value or set it in a microflow.

**How do I make the input look like the other inputs of my form?**
Add CSS for the class `widget-inputmask-input` to your theme.

**Does it work in older Mendix versions?**
Version 1.1.0 is built and tested for Studio Pro 10.24.17. Version 1.0.0 (GitHub release Version1.0.0) was made for Mendix 10.24.6.
