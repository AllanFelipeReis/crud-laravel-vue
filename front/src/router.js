import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/people",
    name: "list-person",
    meta: {
      title: 'List People',
      metaTags: [
        {
          name: 'description',
          content: 'The page to list people.'
        },
        {
          property: 'og:description',
          content: 'The page to list people.'
        }
      ]
    },
    component: () => import("./components/Person/ListPerson")
  },
  {
    path: "/person/:id",
    name: "update-person",
    meta: {
      title: 'Update Person',
      metaTags: [
        {
          name: 'description',
          content: 'The page to update a person'
        },
        {
          property: 'og:description',
          content: 'The page to update a person'
        }
      ]
    },
    component: () => import("./components/Person/UpdatePerson")
  },
  {
    path: "/add",
    name: "add-person",
    meta: {
      title: 'Add Person',
      metaTags: [
        {
          name: 'description',
          content: 'The page for adding a person'
        },
        {
          property: 'og:description',
          content: 'The page for adding a person'
        }
      ]
    },
    component: () => import("./components/Person/AddPerson")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  if(!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router;
