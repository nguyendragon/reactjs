import Home from '../pages/Home';
import Recharge from '../pages/My/Recharge';

// Public Router

let defaultTitle = 'Shopee Việt Nam';

const publicRoutes = [
    // Trang chủ
    { path: '/', title: 'Trang chủ', component: Home },

    // Nạp rút tiền
    { path: '/recharge', title: `Nạp tiền | ${defaultTitle}`, component: Recharge, layout: null },
];
// Private Router
const privateRoutes = [];

export { publicRoutes, privateRoutes };
