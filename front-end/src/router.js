import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Index.vue'
import ReservationList from './views/ReservationList'
import RoomList from './views/rooms/RoomList'
import AddRoom from './views/rooms/AddRoom'
import UserList from './views/users/UserList'

import CreateUser from './views/users/CreateUser'
import Auth from './views/authentication/index'
Vue.use(Router)

const routes = [
	{ path: '', redirect: { name: 'home' } },
	{
		path: '/login',
		name: 'login',
		component: Auth,
		meta: {
			layout: 'default'
		}
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		meta: {
			layout: 'admin'
		}
	},
	{
		path: '/reservation-list',
		name: 'reservation-list',
		component: ReservationList,
		meta: {
			layout: 'admin'
		}
	},

	{
		path: '/room-list',
		name: 'room-list',
		component: RoomList,
		meta: {
			layout: 'admin'
		}
	},
	{
		path: '/add-room',
		name: 'add-room',
		component: AddRoom,
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
	const path = ['/login', '/register', '/home'];
	if (path.includes(to.path) || to.path === "/callback" || CurrentUser) {
		return next();
	}
	next('/login')
});
export default router