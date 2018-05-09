vue 动画切换动画封装，两块，无滑动


先切换后加载：SwitchOne
先切换后进行数据请求

先加载再切换：SwitchOne2
数据请求完成后再切换

不使用 vue transition 讨论：
即使避免 display 造成的页面重排，但数据改变依然会发生大的重排，所以节省这点性能意义不大。
所以，不使用 vue transition 的情况应该是数据固定不变时
