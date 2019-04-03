<template>
  <div :class="$style.article">
    <!-- <div class="markdown-body" v-html="htmlCont" @click="onSelect"></div> -->
    <div class="markdown-body" v-html="htmlCont" />
  </div>
</template>

<script>
// import 'highlight.js/styles/xcode.css'
// import DomSelect from './dom-select.js'
import marked from 'marked'

export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    }
  },
  computed: {
    htmlCont () {
      marked.setOptions({
        baseUrl: '/docs' + this.path.replace(/[^/\\]+\.md$/, '')
      })
      return marked(this.content.replace(/\+\+\+([\d\D]+?)\+\+\+/, '```$1```'))
      // return marked(this.content)
    }
  },
  // created () {
  //   this.hxSelect = new DomSelect()
  //   this.articleSelect = new DomSelect()
  // },
  mounted () {
    // 文章定位优化
    this.$el.children[0].style.paddingBottom = innerHeight / 2 + 'px'
  },
  // methods: {
  //   onSelect ({ target }) {
  //     if (/H\d/.test(target.tagName)) {
  //       this.highlight(target)
  //       this.$emit('select', target.dataset.index * 1)
  //     }
  //   },
  //   highlight (hx) {
  //     this.hxSelect.select(hx)
  //     this.articleSelect.select(hx.parentElement)
  //   },
  //   select (index) {
  //     this.$nextTick(() => {
  //       const hx = this.hxs[index]
  //       window.scrollTo(0, hx.offsetTop - 10)
  //       this.highlight(hx)
  //     })
  //   }
  // },
  // watch: {
  //   content () {
  //     this.$nextTick(() => {
  //       this.hxs = this.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
  //     })
  //   }
  // }
}
</script>

<style module>
.article :global {
  .markdown-body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif;
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  .markdown-body table {border-collapse: collapse;}
  .markdown-body strong {
    color: #d00;
  }
  .markdown-body a {
    color: #0366d6;
    text-decoration: none;
  }

  .markdown-body a:hover {
    text-decoration: underline;
  }

  .markdown-body:after,
  .markdown-body:before {
    display: table;
    content: "";
  }

  .markdown-body:after {
    clear: both;
  }

  .markdown-body > :first-child {
    margin-top: 0 !important;
  }

  .markdown-body > :last-child {
    margin-bottom: 0 !important;
  }

  .markdown-body a:not([href]) {
    color: inherit;
    text-decoration: none;
  }

  .markdown-body .absent {
    color: #cb2431;
  }

  .markdown-body .anchor {
    float: left;
    padding-right: 4px;
    margin-left: -20px;
    line-height: 1;
  }

  .markdown-body .anchor:focus {
    outline: none;
  }

  .markdown-body blockquote,
  .markdown-body dl,
  .markdown-body ol,
  .markdown-body p,
  .markdown-body pre,
  .markdown-body table,
  .markdown-body ul {
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 16px;
  }

  .markdown-body hr {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #e1e4e8;
    border: 0;
  }

  .markdown-body blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
  }

  .markdown-body blockquote > :first-child {
    margin-top: 0;
  }

  .markdown-body blockquote > :last-child {
    margin-bottom: 0;
  }

  .markdown-body kbd {
    display: inline-block;
    padding: 3px 5px;
    font-size: 11px;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: 1px solid #c6cbd1;
    border-bottom-color: #959da5;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #959da5;
  }

  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }

  .markdown-body h1 .octicon-link,
  .markdown-body h2 .octicon-link,
  .markdown-body h3 .octicon-link,
  .markdown-body h4 .octicon-link,
  .markdown-body h5 .octicon-link,
  .markdown-body h6 .octicon-link {
    color: #1b1f23;
    vertical-align: middle;
    visibility: hidden;
  }

  .markdown-body h1:hover .anchor,
  .markdown-body h2:hover .anchor,
  .markdown-body h3:hover .anchor,
  .markdown-body h4:hover .anchor,
  .markdown-body h5:hover .anchor,
  .markdown-body h6:hover .anchor {
    text-decoration: none;
  }

  .markdown-body h1:hover .anchor .octicon-link,
  .markdown-body h2:hover .anchor .octicon-link,
  .markdown-body h3:hover .anchor .octicon-link,
  .markdown-body h4:hover .anchor .octicon-link,
  .markdown-body h5:hover .anchor .octicon-link,
  .markdown-body h6:hover .anchor .octicon-link {
    visibility: visible;
  }

  .markdown-body h1 code,
  .markdown-body h1 tt,
  .markdown-body h2 code,
  .markdown-body h2 tt,
  .markdown-body h3 code,
  .markdown-body h3 tt,
  .markdown-body h4 code,
  .markdown-body h4 tt,
  .markdown-body h5 code,
  .markdown-body h5 tt,
  .markdown-body h6 code,
  .markdown-body h6 tt {
    font-size: inherit;
  }

  .markdown-body h1 {
    font-size: 2em;
  }

  .markdown-body h1,
  .markdown-body h2 {
    padding-bottom: 0.3em;
    border-bottom: 1px solid #eaecef;
  }

  .markdown-body h2 {
    font-size: 1.5em;
  }

  .markdown-body h3 {
    font-size: 1.25em;
  }

  .markdown-body h4 {
    font-size: 1em;
  }

  .markdown-body h5 {
    font-size: 0.875em;
  }

  .markdown-body h6 {
    font-size: 0.85em;
    color: #6a737d;
  }

  .markdown-body ol,
  .markdown-body ul {
    padding-left: 2em;
  }
  .markdown-body ol.no-list,
  .markdown-body ul.no-list {
    padding: 0;
    list-style-type: none;
  }

  .markdown-body ol ol,
  .markdown-body ol ul,
  .markdown-body ul ol,
  .markdown-body ul ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  .markdown-body li > p {
    margin-top: 16px;
  }

  .markdown-body li + li {
    margin-top: 0.25em;
  }

  .markdown-body dl {
    padding: 0;
  }

  .markdown-body dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: 600;
  }

  .markdown-body dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .markdown-body table {
    display: block;
    width: 100%;
    overflow: auto;
  }

  .markdown-body table th {
    font-weight: 600;
  }

  .markdown-body table td,
  .markdown-body table th {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  .markdown-body table tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
  }

  .markdown-body table tr:nth-child(2n) {
    background-color: #f6f8fa;
  }

  .markdown-body table img {
    background-color: transparent;
  }

  .markdown-body img {
    max-width: 100%;
    box-sizing: content-box;
    background-color: #fff;
  }

  .markdown-body img[align="right"] {
    padding-left: 20px;
  }

  .markdown-body img[align="left"] {
    padding-right: 20px;
  }

  .markdown-body .emoji {
    max-width: none;
    vertical-align: text-top;
    background-color: transparent;
  }

  .markdown-body span.frame {
    display: block;
    overflow: hidden;
  }

  .markdown-body span.frame > span {
    display: block;
    float: left;
    width: auto;
    padding: 7px;
    margin: 13px 0 0;
    overflow: hidden;
    border: 1px solid #dfe2e5;
  }

  .markdown-body span.frame span img {
    display: block;
    float: left;
  }

  .markdown-body span.frame span span {
    display: block;
    padding: 5px 0 0;
    clear: both;
    color: #24292e;
  }

  .markdown-body span.align-center {
    display: block;
    overflow: hidden;
    clear: both;
  }

  .markdown-body span.align-center > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: center;
  }

  .markdown-body span.align-center span img {
    margin: 0 auto;
    text-align: center;
  }

  .markdown-body span.align-right {
    display: block;
    overflow: hidden;
    clear: both;
  }

  .markdown-body span.align-right > span {
    display: block;
    margin: 13px 0 0;
    overflow: hidden;
    text-align: right;
  }

  .markdown-body span.align-right span img {
    margin: 0;
    text-align: right;
  }

  .markdown-body span.float-left {
    display: block;
    float: left;
    margin-right: 13px;
    overflow: hidden;
  }

  .markdown-body span.float-left span {
    margin: 13px 0 0;
  }

  .markdown-body span.float-right {
    display: block;
    float: right;
    margin-left: 13px;
    overflow: hidden;
  }

  .markdown-body span.float-right > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: right;
  }

  .markdown-body code,
  .markdown-body tt {
    padding: 0;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
  }

  .markdown-body code:after,
  .markdown-body code:before,
  .markdown-body tt:after,
  .markdown-body tt:before {
    letter-spacing: -0.2em;
    content: "\A0";
  }

  .markdown-body code br,
  .markdown-body tt br {
    display: none;
  }

  .markdown-body del code {
    text-decoration: inherit;
  }

  .markdown-body pre {
    /* word-wrap: normal; */
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
  }

  .markdown-body pre > code {
    padding: 0;
    margin: 0;
    font-size: 100%;
    /* word-break: normal;
    white-space: pre; */
    background: transparent;
    border: 0;

    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
  }

  .markdown-body .highlight {
    margin-bottom: 16px;
  }

  .markdown-body .highlight pre {
    margin-bottom: 0;
    word-break: normal;
  }

  .markdown-body .highlight pre,
  .markdown-body pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
  }

  .markdown-body pre code,
  .markdown-body pre tt {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }

  .markdown-body pre code:after,
  .markdown-body pre code:before,
  .markdown-body pre tt:after,
  .markdown-body pre tt:before {
    content: normal;
  }

  .markdown-body .csv-data td,
  .markdown-body .csv-data th {
    padding: 5px;
    overflow: hidden;
    font-size: 12px;
    line-height: 1;
    text-align: left;
    white-space: nowrap;
  }

  .markdown-body .csv-data .blob-num {
    padding: 10px 8px 9px;
    text-align: right;
    background: #fff;
    border: 0;
  }

  .markdown-body .csv-data tr {
    border-top: 0;
  }

  .markdown-body .csv-data th {
    font-weight: 600;
    background: #f6f8fa;
    border-top: 0;
  }

  code {
    margin-top: 0;
    margin-bottom: 0;
    font: 12px SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
      monospace;
  }

  section.selected {
    outline: 4px solid #fff;
    box-shadow: #85cfff 0 0 0 6px;
  }
  h1.selected,
  h2.selected,
  h3.selected,
  h4.selected,
  h5.selected,
  h6.selected {
    background-color: #ffc;
  }

/*   .hljs {
    display: block;
    background: #fff;
    padding: 0.5em;
    color: #333;
    overflow-x: auto;
  }

  .hljs-comment,
  .hljs-meta {
    color: #969896;
  }

  .hljs-emphasis,
  .hljs-quote,
  .hljs-string,
  .hljs-strong,
  .hljs-template-variable,
  .hljs-variable {
    color: #df5000;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-type {
    color: #a71d5d;
  }

  .hljs-attribute,
  .hljs-bullet,
  .hljs-literal,
  .hljs-symbol {
    color: #0086b3;
  }

  .hljs-name,
  .hljs-section {
    color: #63a35c;
  }

  .hljs-tag {
    color: #333;
  }

  .hljs-attr,
  .hljs-selector-attr,
  .hljs-selector-class,
  .hljs-selector-id,
  .hljs-selector-pseudo,
  .hljs-title {
    color: #795da3;
  }

  .hljs-addition {
    color: #55a532;
    background-color: #eaffea;
  }

  .hljs-deletion {
    color: #bd2c00;
    background-color: #ffecec;
  }

  .hljs-link {
    text-decoration: underline;
  } */
}
</style>
