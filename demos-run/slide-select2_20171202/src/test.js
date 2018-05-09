/* 传统使用测试 只绑定左侧一栏 */
import './modules/slide-select/slide-select.css'
import SlideSelectBase from './modules/slide-select/slide-select-base'

let template = `<div id="test1" class="slide-select">
  <div class="s-bar">
    <a class="cl-btn">取消</a>
    <a class="cfm-btn">确认</a>
    <div class="s-info">2017/1/1~2018/1/1</div>
  </div>
  <div class="s-tit">
    <div class="s-t">开始时间</div>
    <div class="s-t">结束时间</div>
  </div>
  <div class="s-main">
    <div class="s-list">
      <div class="s-sel">
        <div class="s-mask s-t-mask"></div>
        <div class="s-mask s-b-mask"></div>
        <ul class="s-move" style="transform: translate3d(0px, 0px, 0px);">
          <li class="s-item">1</li>
          <li class="s-item">2</li>
          <li class="s-item">3</li>
          <li class="s-item">4</li>
          <li class="s-item">5</li>
          <li class="s-item">6</li>
          <li class="s-item">7</li>
          <li class="s-item">8</li>
          <li class="s-item">9</li>
          <li class="s-item">10</li>
          <li class="s-item">11</li>
          <li class="s-item">12</li>
        </ul>
      </div>
    </div>
    <div class="s-list">
      <div class="s-sel">
        <div class="s-mask s-t-mask"></div>
        <div class="s-mask s-b-mask"></div>
        <ul class="s-move">
          <li class="s-item">2026</li>
          <li class="s-item">2025</li>
          <li class="s-item">2024</li>
          <li class="s-item">2023</li>
          <li class="s-item">2022</li>
          <li class="s-item">2021</li>
          <li class="s-item">2020</li>
          <li class="s-item">2019</li>
          <li class="s-item">2018</li>
          <li class="s-item">2017</li>
          <li class="s-item">2016</li>
          <li class="s-item">2015</li>
          <li class="s-item">2014</li>
          <li class="s-item">2013</li>
          <li class="s-item">2012</li>
          <li class="s-item">2011</li>
          <li class="s-item">2010</li>
          <li class="s-item">2009</li>
          <li class="s-item">2008</li>
          <li class="s-item">2007</li>
        </ul>
      </div>
    </div>
  </div>
</div>`

document.body.innerHTML = template

let eDrag = document.getElementById('test1').querySelector('.s-list')
let eMove = eDrag.querySelector('.s-move')
let eItems = eMove.children
let slideSelectBase = new SlideSelectBase({
  eDrag,
  eMove
})
slideSelectBase.update(eItems.length, eDrag.querySelector('.s-sel').clientHeight)
console.log(slideSelectBase)
