<template>
  <div class="wrap">
    <page-title/>
    <div class="profile">
      <div>
        <div class="item" v-for="(item, index) in cv" :key="index">
          <h2 class="title">{{item.title}}</h2>
          <div v-for="(items, index) in item.items" :key="index" class="text-wrap">
            <span v-if="items.year" class="year">{{items.year}}</span>
            <ul>
              <li class="info-list" v-for="(text, index) in items.text" :key="index">{{text}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle";
export default {
  name: "CV",
  components: {PageTitle},
  computed: {
    cv() {
      return this.$store.state.cv
    }
  },
  mounted() {
    this.$store.dispatch('loadCv')
  }
}
</script>

<style scoped lang="scss">

  .item{
    margin-bottom: 40px;
    .title, .info-list, .year{
      font-size: 0.75rem;
      line-height: 1rem;
    }
    .title{
      font-weight: 700;
    }
    .text-wrap{
      display: flex;
      flex-direction: row;
      .year{
        margin-right: 8px;
        white-space: pre;
      }
      .info-list{
        margin-bottom: 8px;
      }
    }
  }

@media screen and (max-width: 768px) {
  .text-wrap{
    margin-bottom: 8px;
  }
}
</style>