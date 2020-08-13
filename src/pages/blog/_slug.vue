<template>
  <div>
    <div v-if="posts && posts instanceof Array">
      <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-xs-12 col-lg-8">
          <div class="row mb-3">
            <div class="col">
              <h1 class="display-4">Blog</h1>
              <small> Subscribe <a href="/rss.xml" class="rss">via RSS</a>. </small>
            </div>
          </div>

          <div v-for="(post, index) in posts" :key="index">
            <div class="row mb-3">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <h6 class="card-subtitle text-muted mb-2">
                      <small>{{ formatDate(post.createdAt) }}</small>
                    </h6>
                    <nuxt-link :to="post.path || '/'" class="post-title">
                      <h5 class="card-title">{{ post.title }}</h5>
                    </nuxt-link>
                    <nuxt-link :to="post.path || '/'" class="post-excerpt">
                      <p class="card-text text-muted">{{ post.description }}</p>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
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
    const { slug } = params;
    const posts = await $content('blog', slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' });
      });
    return {
      posts
    };
  },

  methods: {
    formatDate(date) {
      const formattedDate = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return formattedDate.toLocaleString('en-AU', options);
    }
  }
};
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

.post-title h5 {
  font-weight: bold;
}

.post-excerpt {
  text-decoration: none !important;
}
</style>
