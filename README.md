# stylelint-config-obsidianmd

Shareable [Stylelint](https://stylelint.io/) config for [Obsidian](https://obsidian.md) themes. This config enforces the same CSS rules used by the Obsidian community plugin/theme review process.

Extends [`stylelint-config-standard`](https://github.com/stylelint/stylelint-config-standard).

## Installation

```bash
npm install --save-dev stylelint stylelint-config-obsidianmd
```

## Usage

Create a `.stylelintrc.json` in your theme's root:

```json
{
    "extends": "stylelint-config-obsidianmd"
}
```

Then run:

```bash
npx stylelint "**/*.css"
```

### Editor integration

Install the [Stylelint VS Code extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) for real-time feedback as you write CSS.

## Rules

This config extends `stylelint-config-standard` and adds Obsidian-specific rules. Rules marked with severity **error** will block theme submission; **warning** rules are flagged but won't block.

### Obsidian-specific rules

| Rule                                        | Severity | Description                                                                                                                                                                             |
| ------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `function-url-scheme-disallowed-list`       | error    | External URLs (`http`, `https`, `file`) are not allowed. Embed images and fonts as [base64 data URIs](https://docs.obsidian.md/Themes/App+themes/Embed+fonts+and+images+in+your+theme). |
| `function-url-scheme-allowed-list`          | error    | Only `data:` URIs are permitted for embedded assets.                                                                                                                                    |
| `declaration-no-important`                  | warning  | Avoid `!important`. Override styles by increasing selector specificity or using [CSS variables](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables).                        |
| `color-named`                               | warning  | Use hex colors or Obsidian CSS variables instead of named colors (e.g. `red`) to ensure proper light/dark theme support.                                                                |
| `declaration-block-no-duplicate-properties` | warning  | No duplicate properties within a declaration block.                                                                                                                                     |
| `plugin/no-unsupported-browser-features`    | warning  | Flags CSS features unsupported by the target Electron version. Defaults to Electron 43 (Obsidian 1.13.4).                                                                               |
| `selector-pseudo-class-disallowed-list`     | warning  | Disallows `:has()` due to performance issues from broad selector invalidation.                                                                                                          |
| `selector-pseudo-class-no-unknown`          | warning  | Flags unknown pseudo-classes (ignores `:global` and `:local`).                                                                                                                          |
| `selector-pseudo-element-no-unknown`        | warning  | Flags unknown pseudo-elements.                                                                                                                                                          |
| `selector-type-no-unknown`                  | warning  | Flags unknown type selectors.                                                                                                                                                           |
| `at-rule-no-unknown`                        | warning  | Flags unknown at-rules (ignores `@layer`, `@property`, `@container`).                                                                                                                   |
| `unit-no-unknown`                           | warning  | Flags unknown CSS units.                                                                                                                                                                |
| `property-disallowed-list`                  | warning  | Disallows the `all` property.                                                                                                                                                           |

### Disabled rules

These `stylelint-config-standard` rules are turned off because they produce too many false positives in Obsidian themes:

- `custom-property-no-missing-var-function`
- `no-duplicate-selectors`
- `no-duplicate-at-import-rules`
- `shorthand-property-no-redundant-values`

## Overriding the browser target

The browser compatibility rule defaults to Electron 43 (Obsidian 1.13.4). If your theme targets a different `minAppVersion`, override it in your `.stylelintrc.json`:

```json
{
    "extends": "stylelint-config-obsidianmd",
    "rules": {
        "plugin/no-unsupported-browser-features": [
            true,
            {
                "severity": "warning",
                "browsers": ["electron >= 25"],
                "ignore": ["css-nesting", "css-cascade-layers"]
            }
        ]
    }
}
```

| Electron | Obsidian |
| -------- | -------- |
| 25       | 1.4.5    |
| 28       | 1.5.8    |
| 30       | 1.6.5    |
| 31       | 1.7.4    |
| 37       | 1.9.12   |
| 39       | 1.11.4   |
| 43       | 1.13.4   |

## License

[MIT](LICENSE.md) &copy; [Dynalist Inc.](https://obsidian.md)
