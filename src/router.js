import VueRouter from 'vue-router';
import Home from '@/components/home/Home';
import DevBlog from '@/components/blog/DevelopmentBlog';
import LambdaBlog from '@/components/blog/LambdaBlog';
import MLBlog from '@/components/blog/MLBlog';
import WebfluxBlog from '@/components/blog/WebfluxBlog';
import ReleaseProcessBlog from '@/components/blog/ReleaseProcessBlog';
import PyPiBlog from '@/components/blog/PyPiBlog';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/blog',
    component: DevBlog
  },
  {
    path: '/blog/lambda',
    component: LambdaBlog
  },
  {
    path: '/blog/ml',
    component: MLBlog
  },
  {
    path: '/blog/webflux',
    component: WebfluxBlog
  },
  {
    path: '/blog/release-process',
    component: ReleaseProcessBlog
  },
  {
    path: '/blog/pypi',
    component: PyPiBlog
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;
