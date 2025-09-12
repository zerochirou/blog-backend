const CategoriesController = () => import('#controllers/categories_controller')
const PostsController = () => import('#controllers/posts_controller')
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .group(function () {
    router.get('all', [CategoriesController, 'findAllCategories']).use(middleware.apikey())
    router.post('create', [CategoriesController, 'createCategory'])
    router
      .get('find/id/:id', [CategoriesController, 'findCategoryById'])
      .where('id', router.matchers.uuid())
    router
      .delete('remove/id/:id', [CategoriesController, 'removeCategory'])
      .where('id', router.matchers.uuid())
  })
  .prefix('category')

router
  .group(function () {
    router.get('all', [PostsController, 'findAllPosts'])
    router
      .get('find/category/:id', [PostsController, 'findPostsByCategory'])
      .where('id', router.matchers.uuid())
    router
      .get('find/slug/:slug', [PostsController, 'findPostsBySlug'])
      .where('slug', router.matchers.slug())
    router.post('create', [PostsController, 'createPost'])
    router
      .delete('remove/id/:id', [PostsController, 'removePost'])
      .where('id', router.matchers.uuid())
  })
  .prefix('post')

router
  .group(function () {
    router.post('create_admin', [AuthController, 'createAdmin'])
    router.post('login', [AuthController, 'login'])
    router.get('me', [AuthController, 'me'])
  })
  .prefix('auth')
