/* https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md */
module.exports = {
  "rules": {
    "color-no-invalid-hex": true, // 禁止无效的十六进制颜色。

    "font-family-no-duplicate-names": true, // 不允许重复的字体系列名称。
    // "font-family-no-missing-generic-family-keyword": true, // 不允许在字体名称列表中缺少通用。

    "function-calc-no-unspaced-operator": true,
    "function-linear-gradient-no-nonstandard-direction": true,

    "string-no-newline": true,

    "unit-no-unknown": true, // 禁止未知单位。

    "property-no-unknown": true, // 禁止未知属性

    "keyframe-declaration-no-important": true,

    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-shorthand-property-overrides": true,

    // "block-no-empty": true, // 禁止空的选择器

    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": true,
    "selector-type-no-unknown": true,

    "media-feature-name-no-unknown": true,

    "at-rule-no-unknown": true,

    "comment-no-empty": true,

    // "no-descending-specificity": true,
    "no-duplicate-at-import-rules": true, // 禁止@import样式表中的重复规则
    "no-duplicate-selectors": true, // 不允许重复的选择器
    "no-empty-source": true, // 禁止空的来源
    "no-extra-semicolons": true, // 不允许多余的分号。
    // "no-invalid-double-slash-comments": true, //...CSS不支持的双斜线注释（）。
  }
}
