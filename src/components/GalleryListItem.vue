<template>
  <div class="item-wrap">
    <router-link
      :to="`/${itemData.type}/${itemData.id}`"
      @click="onClickArtworkList"
    >
      <div :class="{ archives: itemData.type === 'archives' }" class="bg-img">
        <img :src="itemData.thumb" alt="" />
      </div>
      <template v-if="this.$route.name !== 'Main'">
        <p class="text-title">{{ itemData.title }}</p>
        <p class="text-year">{{ itemData.year }}</p>
      </template>
      <template v-else>
        <p class="text-title main-text">{{ itemData.title }}</p>
        <p class="text-year main-text">{{ itemData.caption }}</p>
      </template>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "GalleryListItem",
  props: {
    itemData: Object,
  },
  data() {
    return {
      displayList: true,
    };
  },

  methods: {
    onClickArtworkList() {
      this.$emit("invisible", !this.displayList);
    },
  },
};
</script>

<style scoped lang="scss">
.item-wrap {
  display: flex;
  flex-direction: column;

  .bg-img {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    background-color: #efefef;

    &.archives {
      padding-bottom: 141.4%;
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .text-title {
    margin: 8px 0 6px 0;
    font-size: 0.75em;
    line-height: 1.3333em;
    word-break: keep-all;
  }

  .text-year {
    font-size: 0.75em;
    color: #666666;
  }
}

@media screen and (max-width: 767px) {
  .main-text {
    &.text-title {
      font-weight: 700;
      line-height: 1.6;
    }

    &.text-year {
      line-height: 1.3;
    }
  }
}

@media screen and (min-width: 768px) {
  .main-text {
    &.text-title {
      font-size: 1em;
      font-weight: 700;
    }

    &.text-year {
      font-size: 1em;
    }
  }
}
</style>
