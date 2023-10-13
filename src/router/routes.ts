import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // name: 'home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/AboutView.vue')
      },
      {
        name: 'Article',
        path: '/article',
        redirect: '/',
        children: [
          {
            name: 'ArticleDetail',
            path: 'detail/:id',
            component: () => import('@/views/article/index.vue'),
            meta: {
              keepAlive: false
            },
            children: []
          },
          {
            name: 'Archive',
            path: 'archive',
            component: () => import('@/views/article/archive/index.vue'),
            meta: {
              keepAlive: true
            },
            children: []
          },
          {
            name: 'Category',
            path: 'category',
            component: () => import('@/views/article/category/index.vue'),
            meta: {
              keepAlive: true
            },
            children: []
          },
          {
            name: 'CategoryQuery',
            path: 'category/query/:id',
            component: () => import('@/views/article/query/index.vue'),
            meta: {
              // TODO bug 缓存了在进入就不会刷新，（可以用更改路由的方式，转换路由跳转地址）
              keepAlive: false
            },
            children: []
          },
          {
            name: 'Tag',
            path: 'tag',
            component: () => import('@/views/article/tag/index.vue'),
            meta: {
              keepAlive: true
            },
            children: []
          },
          {
            name: 'TagQuery',
            path: 'tag/query/:id',
            component: () => import('@/views/article/query/index.vue'),
            meta: {
              // TODO bug 缓存了在进入就不会刷新，（可以用更改路由的方式，转换路由跳转地址）
              keepAlive: false
            },
            children: []
          }
        ]
      },
      {
        name: 'Talk',
        path: '/talk',
        component: () => import('@/views/talk/index.vue'),
        meta: {
          keepAlive: true
        },
        children: []
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/AboutView.vue')
  // }
]
