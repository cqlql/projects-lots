
不使用 vue transition 讨论：
即使避免 display 造成的页面重排，但数据改变依然会发生大的重排，所以节省这点性能意义不大。
所以，不使用 vue transition 的情况应该是数据固定不变时
