<template>
  <div>
    <div v-if="articles && articles instanceof Array">
      <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-xs-12 col-lg-8">
          <div class="row mb-3">
            <div class="col">
              <h1 class="display-4">Blog</h1>
              <small> Subscribe <a href="/rss.xml" class="rss">via RSS</a>. </small>
            </div>
          </div>

          <div v-for="(article, index) in articles" :key="index">
            <div class="row mb-3">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <h6 class="card-subtitle text-muted mb-2">
                      <small>{{ formatFeedDate(article.createdAt) }}</small>
                    </h6>
                    <nuxt-link :to="article.path || '/'" class="feed-post-title">
                      <h5 class="card-title">{{ article.title }}</h5>
                    </nuxt-link>
                    <nuxt-link v-if="articlesReady" :to="article.path || '/'" class="feed-post-excerpt">
                      <p class="card-text text-muted">
                        {{ articleExcerptList.find((el) => el.slug === article.slug).excerpt }}
                      </p>
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

    <div v-else-if="articles && !(articles instanceof Array)">
      <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-xs-12 col-lg-8">
          <article class="post-content mb-5">
            <h1 class="font-weight-bold post-title">{{ articles.title }}</h1>
            <p class="post-date">
              <small class="text-muted mb-4">
                {{ formatPostDate(articles.createdAt) }} |
                <i class="far fa-clock"></i>
                <ReadingTime :content="articleText" />
              </small>
            </p>
            <nuxt-content :document="articles" />
          </article>
        </div>
        <div class="col-lg-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ReadingTime from '../../components/ReadingTime.vue';

export default {
  async asyncData({ $content, params, error }) {
    const { slug } = params;

    const articles = await $content('blog', slug)
      .sortBy('createdAt', 'desc')
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' });
      });

    console.log(articles);

    return {
      articles
    };
  },

  data() {
    return {
      articlesReady: false,
      articleExcerptList: [],
      articleText: ''
    };
  },

  components: {
    ReadingTime
  },

  async mounted() {
    if (this.articles && this.articles instanceof Array) {
      for (const article of this.articles) {
        const articleExcerpt = await this.getArticleExcerpt(article.path);

        const excerptObj = {
          slug: article.slug,
          excerpt: articleExcerpt
        };

        this.articleExcerptList.push(excerptObj);
      }

      this.articlesReady = true;
    }

    if (this.articles && !(this.articles instanceof Array)) {
      this.articleText = await this.getArticleText(this.articles.path);
    }
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
    },

    async getArticleText(articlePath) {
      const { text } = await this.$content(articlePath, { text: true }).fetch();
      return text;
    },

    async getArticleExcerpt(articlePath) {
      const EXCERPT_LENGTH = 200;
      const articleText = await this.getArticleText(articlePath);
      const lines = await articleText.split('\n');
      const filteredArticleText = [];

      // Don't make an excerpt that starts with a new line, heading or other non-paragraph content.
      lines.forEach((line) => {
        let badLine = false;

        if (line === '') {
          badLine = true;
        }

        if (line.charAt(0) === '_') {
          badLine = true;
        }

        if (line.charAt(0) === '#') {
          badLine = true;
        }

        if (!badLine) {
          filteredArticleText.push(line);
        }
      });

      // Get the excerpt from the filtered text first paragraph.
      let articleExcerpt = filteredArticleText[0].substring(0, EXCERPT_LENGTH);

      // If the excerpt is less than the length wanted that is fine.
      if (articleExcerpt.length < EXCERPT_LENGTH) {
        return articleExcerpt;
      }

      // If the excerpt is equal to the length we want let's make sure the last word is a whole
      // word.
      if (articleExcerpt.charAt(EXCERPT_LENGTH - 1) !== '') {
        for (let i = EXCERPT_LENGTH - 1; i > 0; i--) {
          if (articleExcerpt.charAt(i) === ' ') {
            articleExcerpt = filteredArticleText[0].substring(0, i);
            break;
          }
        }
      }

      return `${articleExcerpt}...`;
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
.nuxt-content img {
  max-width: 100%;
  height: auto;
}

.nuxt-content pre {
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
