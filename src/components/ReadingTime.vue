<template>
  <span>{{ readingTime }} min read</span>
</template>

<script>
export default {
  name: 'ReadingTime',

  props: ['content'],

  computed: {
    readingTime() {
      let postBody = '';
      let minutes = 0;

      const { children: rootChildren } = this.content;

      rootChildren.forEach((childElement) => {
        const { children } = childElement;

        if (children) {
          children.forEach((node) => {
            if (node.type === 'text') {
              postBody += `${node.value} `;
            }
          });
        }
      });

      const contentString = JSON.stringify(postBody);
      const words = contentString.split(' ').length;
      const wordsPerMinute = 200;
      minutes = Math.ceil(words / wordsPerMinute);
      return minutes;
    }
  }
};
</script>
