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
                      <small>{{ formatFeedDate(post.createdAt) }}</small>
                    </h6>
                    <nuxt-link :to="post.path || '/'" class="feed-post-title">
                      <h5 class="card-title">{{ post.title }}</h5>
                    </nuxt-link>
                    <nuxt-link :to="post.path || '/'" class="feed-post-excerpt">
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
      <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-xs-12 col-lg-8">
          <article class="post-content mb-5">
            <h1 class="font-weight-bold post-title">{{ posts.title }}</h1>
            <p class="post-date">
              <small class="text-muted mb-4">
                {{ formatPostDate(posts.createdAt) }} |
                <i class="far fa-clock"></i>
                <ReadingTime :content="posts.body" />
              </small>
            </p>
            <nuxt-content :document="posts" />
          </article>
        </div>
        <div class="col-lg-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ReadingTime from '../../components/ReadingTime';

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

  components: {
    ReadingTime
  },

  methods: {
    formatFeedDate(date) {
      const formattedDate = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return formattedDate.toLocaleString('en-AU', options);
    },

    formatPostDate(date) {
      const formattedDate = new Date(date);
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return formattedDate.toLocaleString('en-AU', options);
    }
  }
};
</script>

<style lang="scss">
/**
 * Blog Feed
 * =========
 */
.rss {
  color: inherit;
  text-decoration: underline;
}

.rss:hover {
  color: inherit;
}

.feed-post-title {
  color: inherit;
  text-decoration: none !important;
}

.feed-post-title:hover {
  color: inherit;
}

.feed-post-title h5 {
  font-weight: bold;
}

.feed-post-excerpt {
  text-decoration: none !important;
}

/**
 * Blog Post
 * =========
 */
pre {
  border-radius: 4px;
}

.post-title {
  color: #292e31;
}

.post-content {
  color: #4c555a;
  font-family: 'Lora', serif;
  font-size: 1.2rem;
}

.post-content h1 {
  font-family: 'Lora', serif;
  font-size: 2.4rem;
}

.post-content h2 {
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  margin-top: 3rem;
}

.post-content h3 {
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  margin-top: 3rem;
}

.post-content a {
  color: inherit;
  text-decoration: underline;
}

.post-date {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
}

blockquote {
  font-family: 'Open Sans', sans-serif;
  color: rgba(0,0,0,.6);
  padding-left: 2rem !important;
}

blockquote p {
  font-style: italic;
}
</style>
