## Input Mask

Text input for Mendix web apps that only accepts characters that fit a mask, for example a phone number, a date or an ID format. Built on [@react-input/mask](https://www.npmjs.com/package/@react-input/mask).

Version 1.1.0, for Mendix Studio Pro 10.24.17 (React client).

## Properties

| Property    | Type              | Required | What it does                                                                          |
| ----------- | ----------------- | -------- | ------------------------------------------------------------------------------------- |
| Value       | String attribute  | yes      | Stores the text exactly as shown in the input, including the fixed mask characters.   |
| Mask        | String attribute  | yes      | The mask, for example `+91 _____ _____`.                                              |
| Replacement | String attribute  | yes      | Rules for the mask characters: `character:/regular expression/`, separated by commas. |
| Show Mask   | Boolean attribute | no       | Shows the whole mask while the user types.                                            |
| Separate    | Boolean attribute | no       | Typed characters keep their position; deleting in the middle leaves a gap.            |
| Placeholder | String attribute  | no       | Placeholder text. "Enter value" when empty.                                           |
| On click    | Action            | no       | Runs when the user clicks the input.                                                  |

## Issues, suggestions and feature requests

https://github.com/bharathidas/InputMask/issues

## Development

1. `npm install`
2. `npm run release` runs the lint check and builds `dist/1.1.0/mendix.InputMask.mpk`.
3. `npm start` rebuilds on every change and copies the widget to the Mendix test project set in `package.json` (`config.projectPath`).
