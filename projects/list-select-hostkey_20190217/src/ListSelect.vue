<template>
  <ul :class="$style.listSelect">
    <li :class="[$style.item, $style.highlighted]">天空</li>
    <li :class="$style.item" selected>大地</li>
    <li :class="$style.item">
      万物是一个汉语词汇，读音为wàn wù，统指宇宙内外一切存在物（即物质）；狭指地球一切存在物。“万物”是数量词，万物中的万字，由于它是汉字数字较大的 数字，故有“最多”之意，不是指有一万个。
需要注意的是“万物”不同于“万事”，“万物”只包含“物”不包含“事”，故而万物指的是物不是事，因此常与“万事”一词搭配使用，才有了“万事万物”这一个词。
    </li>
    <li :class="$style.item">宇宙</li>
    <li :class="$style.item">1</li>
    <li :class="$style.item">2</li>
    <li :class="$style.item">3</li>
  </ul>
</template>

<style module>
.listSelect {
  list-style: none;
  margin: 0;
  padding: 0;

  font-size: 14px;
  border: 1px solid #aaa;
  max-height: 250px;
  overflow: auto;
  border-radius: 5px;

}
.item {
  padding: 6px;
  user-select: none;
  cursor: pointer;
}
.item[selected] {
  background-color: #ddd;
}
.item.highlighted {
  background-color: #5897fb;
    color: white;
}

</style>
