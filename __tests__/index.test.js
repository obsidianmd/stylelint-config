import { beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import stylelint from "stylelint";

import config from "../index.js";

describe("valid CSS produces no warnings", () => {
    const validCss = readFileSync("./__tests__/valid.css", "utf-8");
    let result;

    beforeEach(async () => {
        result = await stylelint.lint({ code: validCss, config });
    });

    it("did not error", () => {
        assert.equal(result.errored, false);
    });

    it("flags no warnings", () => {
        assert.equal(result.results[0].warnings.length, 0);
    });
});

describe("invalid CSS flags Obsidian-specific rules", () => {
    const invalidCss = readFileSync("./__tests__/invalid.css", "utf-8");
    let result;

    beforeEach(async () => {
        result = await stylelint.lint({ code: invalidCss, config });
    });

    it("did error", () => {
        assert.equal(result.errored, true);
    });

    it("flags correct number of warnings", () => {
        assert.equal(result.results[0].warnings.length, 7);
    });

    it("flags correct rules", () => {
        assert.deepEqual(
            result.results[0].warnings.map((w) => w.rule),
            [
                "color-named",
                "declaration-block-no-duplicate-properties",
                "declaration-no-important",
                "function-url-scheme-allowed-list",
                "function-url-scheme-disallowed-list",
                "property-disallowed-list",
                "selector-pseudo-class-disallowed-list",
            ],
        );
    });

    it("uses correct severities", () => {
        const bySeverity = Object.groupBy(
            result.results[0].warnings,
            (w) => w.severity,
        );

        assert.equal(bySeverity.error.length, 2);
        assert.deepEqual(
            bySeverity.error.map((w) => w.rule),
            [
                "function-url-scheme-allowed-list",
                "function-url-scheme-disallowed-list",
            ],
        );
        assert.equal(bySeverity.warning.length, 5);
    });
});

describe("deprecated rules are excluded", () => {
    const ruleNames = Object.keys(config.rules).filter(
        (name) => config.rules[name] !== null,
    );

    it("has rules configured", () => {
        assert.ok(ruleNames.length > 0);
    });

    for (const ruleName of ruleNames) {
        if (ruleName.includes("/")) continue;

        it(`${ruleName} is not deprecated`, async () => {
            const rule = await stylelint.rules[ruleName];

            assert.ok(rule, `Rule "${ruleName}" not found in stylelint`);
            assert.ok(
                !rule.meta.deprecated,
                `Rule "${ruleName}" is deprecated`,
            );
        });
    }
});
