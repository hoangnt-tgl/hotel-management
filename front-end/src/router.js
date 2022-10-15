import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard'
import Profile from './views/Profile'
import ProductList from './views/products/ProductList'
import AddProduct from './views/products/AddProduct'
import UserList from './views/users/UserList'
import CreateUser from './views/users/CreateUser'
import CoupanList from './views/coupans/CoupanList'
import CreateCoupan from './views/coupans/CreateCoupan'
import Auth from './views/authentication/index'
import OrderList from './views/orders/OrderList'
import CreateOrder from './views/orders/CreateOrder'
Vue.use(Router)

const routes = [
	{ path: '', redirect: { name: 'dasboard' } },
	{
		path: '/login',
		name: 'login',
		component: Auth,
		meta: {
			layout: 'default'
		}
	},
	{
		path: '/dashboard',
		name: 'dasboard',
		component: Dashboard,
		meta: {
			layout: 'admin'
		}
	},
	{
		path: '/profile',
		name: 'profile',
		component: Profile,
		meta: {
			layout: 'admin'
		}
	},
	{
		path: '/edit-profile',
		name: 'edit-profile',
		component: Profile,
		meta: {
			layout: 'admin'
		}
	},
	{
		path: '/product-list',
		name: 'product-list',
		component: ProductList,
		meta: {
			layout: 'admin'
		}
	},
	{
		path: '/add-product',
		name: 'add-product',
		component: AddProduct,
		meta: {
			layout: 'admin'
		}
	},
	{
		path: '/user-list',
		name: 'user-list',
		component: UserList,
		meta: {
			layout: 'admin'
		}
	},
	{
		path: '/create-user',
		name: 'create-user',
		component: CreateUser,
		meta: {
			layout: 'admin'
		}
	},
	{
		path: '/create-Coupan',
		name: 'create-Coupan',
		component: CreateCoupan,
		meta: {
			layout: 'admin'
		}
	},
	{
		path: '/coupan-list',
		name: 'coupan-list',
		component: CoupanList,
		meta: {
			layout: 'admin'
		}
	},

	{
		path: '/order-list',
		name: 'order-list',
		component: OrderList,
		meta: {
			layout: 'admin'
		}
	},
	{
		path: '/create-order',
		name: 'create-order',
		component: CreateOrder,
		meta: {
			layout: 'admin'
		}
	},
	{
		path: '*',
		name: 'Error',
		meta: {
			layout: 'error'
		}
	}
]
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
	const CurrentUser = localStorage.getItem('token');
	const path = ['/login', '/register'];
	if (path.includes(to.path) || to.path === "/callback" || CurrentUser) {
		return next();
	}
	next('/login')
});
export default router