<template>
  <main class="wrap">
    <page-title title="Curriculum Vitae" />
    <div class="selected-cv">
      <h2 class="cv-title">{{ selectedCv?.name }}</h2>
      <div class="profile">
        <div
          class="item"
          v-for="(item, index) in selectedCv?.list"
          :key="index"
        >
          <h4 class="title">{{ item.title }}</h4>
          <div
            v-for="(items, index) in item.items"
            :key="index"
            class="text-wrap"
          >
            <span v-if="items.year" class="year">{{ items.year }}</span>
            <ul>
              <li
                class="info-list"
                v-for="(text, index) in items.text"
                :key="index"
              >
                {{ text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <details class="full-cv">
      <summary class="cv-title">
        <h3>{{ fullCv?.name }}</h3>
      </summary>
      <div class="profile">
        <div class="item" v-for="(item, index) in fullCv?.list" :key="index">
          <h4 class="title">{{ item.title }}</h4>
          <div
            v-for="(items, index) in item.items"
            :key="index"
            class="text-wrap"
          >
            <span v-if="items.year" class="year">{{ items.year }}</span>
            <ul>
              <li
                class="info-list"
                v-for="(text, index) in items.text"
                :key="index"
              >
                {{ text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </details>
  </main>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import {useStore} from "../stores/index.js";

export default {
  name: "CV",
  components: { PageTitle },
  computed: {
    cv() {
      return useStore().cv;
    },
    selectedCv() {
      return useStore().cv.selectedCv
    },
    fullCv() {
      return useStore().cv.fullCv
    },
  },
  mounted() {
    // useStore().loadCv();
  },
};
</script>

<style scoped lang="scss">
h2.cv-title {
  font-weight: 700;
  margin-bottom: 20px;
}

.item {
  margin-bottom: 40px;

  .title,
  .info-list,
  .year {
    font-size: 0.75em;
    line-height: 1.3333em;
  }

  .title {
    font-weight: 700;
    line-height: 2.6666em;
  }

  .text-wrap {
    display: flex;
    flex-direction: row;

    .year {
      margin-right: 8px;
      white-space: pre;
    }

    .info-list {
      margin-bottom: 8px;
    }
  }
}

details {
  width: calc(98% - 80px);
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 32px 0 32px 0;
  font-size: 1em;
  line-height: 1.6666em;
  margin-right: 2%;
  box-sizing: border-box;

  &[open] > summary {
    padding-bottom: 16px;

    &::after {
      content: "−";
    }
  }

  summary {
    list-style: none;
    font-size: 1.25em;
    line-height: 1.2em;
    font-weight: 700;
    transition: all 0.15s;
    cursor: pointer;
    word-break: keep-all;

    h3 {
      display: inline-block;
    }

    &::-webkit-details-marker {
      display: none;
    }

    &::after {
      content: "+";
      margin-left: 8px;
    }
  }
}

@media screen and (max-width: 768px) {
  .wrap {
    //min-height: calc(100vh - 184px);
    min-height: calc(calc(var(--vh, 1vh) * 100) - 184px);
    margin-bottom: 64px;

    details {
      width: 100%;
      padding-right: 16px;
    }
  }

  .text-wrap {
    margin-bottom: 8px;
  }
}
</style>
