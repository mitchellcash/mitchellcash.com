<template>
  <div>
    <div v-if="posts && posts instanceof Array">
      <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-xs-12 col-lg-8">
          <div class="row mb-3">
            <div class="col">
              <h1 class="display-4">Blog</h1>
              <small>
                Subscribe <a href="/rss.xml" class="rss">via RSS</a>.
              </small>
            </div>
          </div>

          <div v-for="(post, index) in posts" :key="index" class="col-md-6 col-sm-12">
            <h2>
              <nuxt-link :to="post.path || '/'">{{ post.title }}</nuxt-link>
            </h2>
            <p>
              <small>{{ post.createdAt }}</small>
            </p>
            <p>{{ post.description }}</p>
          </div>
        </div>

        <div class="col-lg-2"></div>
      </div>
    </div>

    <div v-else-if="posts">
      <h1>{{ posts.title }}</h1>
      <p>{{ posts.description }}</p>
      <nuxt-link :to="posts.path || '/'">LINK</nuxt-link>
      <nuxt-content :document="posts" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const { slug } = params
    const posts = await $content('blog', slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return {
      posts
    }
  }
}
</script>

<style lang="scss">
.rss {
  color: inherit;
  text-decoration: underline;
}

.rss:hover {
  color: inherit;
}

.post-title {
  color: inherit;
  text-decoration: none !important;
}

.post-title:hover {
  color: inherit;
}

.post-title div {
  font-weight: bold;
}

.post-excerpt {
  text-decoration: none !important;
}
</style>
