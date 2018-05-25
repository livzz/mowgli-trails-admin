import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import AdminMain from '@/components/Admin/AdminMain';
import TourMain from '@/components/Tour/TourMain';
import BlogMain from '@/components/Blog/BlogMain';
import LoginMain from '@/components/Login/LoginMain';
import DestinationMain from '@/components/Destination/DestinationMain';
import MailingMain from '@/components/Mailing/MailingMain';
import PlacesMain from '@/components/Places/PlacesMain';
import store from '../store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AdminMain',
      component: AdminMain,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/tour',
      name: 'TourMain',
      component: TourMain,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/blog',
      name: 'BlogMain',
      component: BlogMain,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/destinations',
      name: 'DestinationMain',
      component: DestinationMain,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/login',
      name: 'LoginMain',
      component: LoginMain,
    },
    {
      path: '/mailing',
      name: 'MailingMain',
      component: MailingMain,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/places',
      name: 'PlacesMain',
      component: PlacesMain,
      meta: {
        requireAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.auth.isAuthenticated) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
  next();
});
router.beforeResolve((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.auth.isAuthenticated) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
  // console.log(to);
  next();
});

export default router;
