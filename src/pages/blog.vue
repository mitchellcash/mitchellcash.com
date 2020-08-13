<template>
  <div class="row">
    <div class="col-lg-2"></div>
    <div class="col-xs-12 col-lg-8">
      <div class="row mb-3">
        <div class="col">
          <h1 class="display-4">Blog</h1>
          <small>
            Subscribe
            <a href="/rss.xml" class="rss">
              via RSS
            </a>
            .
          </small>
        </div>
      </div>
    </div>
    <div class="col-lg-2"></div>
  </div>
</template>

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
