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
      },
      {
        name: 'TalkDetail',
        path: '/talk/:id',
        component: () => import('@/views/talk/detail/index.vue'),
        meta: {
          keepAlive: false
        },
        children: []
      },
      {
        name: 'Album',
        path: '/album',
        component: () => import('@/views/album/index.vue'),
        meta: {
          keepAlive: true
        },
        children: []
      },
      {
        name: 'AlbumDetail',
        path: '/album/detail/:id',
        component: () => import('@/views/album/detail/index.vue'),
        children: []
      },
      {
        name: 'friend',
        path: '/friend',
        component: () => import('@/views/friend/index.vue'),
        children: []
      },
      {
        name: 'Guestbook',
        path: '/guestbook',
        component: () => import('@/views/guestbook/index.vue'),
        children: []
      },
      {
        name: 'About',
        path: '/about',
        component: () => import('@/views/about/index.vue'),
        children: []
      },
      {
        name: "User",
        path: "/user",
        redirect: "/user/information",
        children: [
          {
            name: "Information",
            path: "information",
            component: () => import("@/views/user/information/index.vue"),
            children: [],
          },
        ],
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
