//

// 批量导入路由
// let routes = []
// function importAll (r) {
//   r.keys().forEach(key => {
//     routes = routes.concat(r(key).default)
//   })
// }

// importAll(require.context('./router', false, /\.js$/))

// export default [
//   {
//     path: '/',
//     name: 'navDev',
//     meta: {title: '快捷导航-dev'},
//     component: {
//       render (h) {
//         const h2Style = { padding: '20px 6px 0', 'font-size': '16px' }
//         const pStyle = { padding: '4px 10px' }
//         const aStyle = { color: 'blue', 'text-decoration': 'underline' }

//         const links = []
//         routes.forEach(route => {
//           links.push(<p style={pStyle}><router-link to={route.path} style={aStyle}>{route.meta.title}</router-link></p>)
//         })

//         return (
//           <div>
//             <h2 style={h2Style}>demos</h2>
//             {links}
//           </div>
//         )
//       }
//     }
//   }
// ]
export default function (routes) {
  routes.push({
    path: '*',
    name: 'navDev',
    meta: { title: '快捷导航-dev' },
    component: {
      render (h) {
        const h2Style = { padding: '20px 6px 0', 'font-size': '16px' }
        const pStyle = { padding: '4px 10px' }
        const aStyle = { color: 'blue', 'text-decoration': 'underline' }

        const links = []
        routes.forEach(route => {
          if (route.path !== '*') links.push(<p style={pStyle}><router-link to={route.path} style={aStyle}>{route.path}</router-link></p>)
        })

        return (
          <div>
            <h2 style={h2Style}>demos</h2>
            {links}
          </div>
        )
      }
    }
  })
}
