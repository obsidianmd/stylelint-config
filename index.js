/** @type {import('stylelint').Config} */
export default {
    extends: ["stylelint-config-standard"],
    plugins: ["stylelint-no-unsupported-browser-features"],
    rules: {
        "function-url-scheme-disallowed-list": [
            ["http", "https", "file"],
            {
                severity: "error",
                message:
                    "External URLs are not allowed in themes. To embed images & fonts encode them as base64 <https://docs.obsidian.md/Themes/App+themes/Embed+fonts+and+images+in+your+theme>",
            },
        ],
        "function-url-scheme-allowed-list": ["data"],
        "declaration-no-important": [
            true,
            {
                severity: "warning",
                message:
                    "Avoid !important — override styles by increasing selector specificity or using CSS variables instead.",
            },
        ],
        "color-named": [
            "never",
            {
                severity: "warning",
                message:
                    "Use hex colors or Obsidian CSS variables instead of named colors to ensure proper light/dark theme support. <https://docs.obsidian.md/Reference/CSS+variables/CSS+variables>",
            },
        ],
        "custom-property-no-missing-var-function": null,
        "no-duplicate-selectors": null,
        "no-duplicate-at-import-rules": null,
        "declaration-block-no-duplicate-properties": [
            true,
            { severity: "warning" },
        ],
        "shorthand-property-no-redundant-values": null,
        "plugin/no-unsupported-browser-features": [
            true,
            {
                severity: "warning",
                browsers: ["electron >= 43"],
                ignore: ["css-nesting", "css-cascade-layers"],
            },
        ],
        "selector-pseudo-class-disallowed-list": [
            ["has"],
            {
                severity: "warning",
                message:
                    "Avoid :has() — it can cause significant performance issues due to broad selector invalidation.",
            },
        ],
        "selector-pseudo-class-no-unknown": [
            true,
            {
                ignorePseudoClasses: ["global", "local"],
                severity: "warning",
            },
        ],
        "selector-pseudo-element-no-unknown": [true, { severity: "warning" }],
        "selector-type-no-unknown": [
            true,
            {
                ignoreTypes: [],
                severity: "warning",
            },
        ],
        "at-rule-no-unknown": [
            true,
            {
                ignoreAtRules: ["layer", "property", "container"],
                severity: "warning",
            },
        ],
        "unit-no-unknown": [true, { severity: "warning" }],
        "property-disallowed-list": [["all"], { severity: "warning" }],
    },
};
