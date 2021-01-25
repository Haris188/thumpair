import DefaultNavLayout from './layout/DefaultNavLayout'
import Home from './views/Home'
import FourOhFour from './views/FourOhFour'
import Compare from './views/Compare'
import Contact from './views/Contact'

export default [
    {
        path:'/',
        element: <DefaultNavLayout />,
        children: [
            {path: '/', element: <Home />, exact: true},
            {path:'/compare', element: <Compare />, exact:true},
            {path: '/contact', element: <Contact />, exact: true},
            {path: '*', element: <FourOhFour />}
        ]
    }
]