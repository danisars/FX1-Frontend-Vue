<template lang="pug">
.xo-live-sports(v-if="sports.length > 0")
  span {{ rowId }}
  .sports-list(v-if="rowId === 'sport'")
    template(v-for="(sport, index) in sports")
      .sport(
        :class="activeSports.includes(sport.slug) && 'active'",
        :key="index",
        @click.prevent="toggleActiveSport(sport.slug)"
      )
        ._icon(v-if="sport.Icon && sport.Icon.PhotoURL")
          img(:src="sport.Icon.PhotoURL")
        ._name {{ sport.name }}
  .sports-list(v-if="rowId === 'partner'")
    template(v-for="(sport, index) in sports")
      .sport(
        :class="activePartners.includes(sport.slug) && 'active'",
        :key="index",
        @click.prevent="toggleActivePartner(sport.name)"
      )
        ._icon(v-if="sport.Icon && sport.Icon.PhotoURL")
          img(:src="sport.Icon.PhotoURL")
        ._name {{ sport.name }}
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'XOLiveSports',
  props: {
    sports: { type: Array, default: () => [] },
    title: { type: String, default: () => "Title" },
    rowId: { type: String, default: () => "sport" }
  },
  data(){
    return {
      activeSports: [],
      activePartners: []
    }
  },
  watch: {
    '$store.state.app.activeSports'(newValue){
      this.activeSports = newValue
    },
    '$store.state.app.activePartners'(newValue){
      this.activePartners = newValue
    }
  },
  beforeDestroy() {
    this.activeSports = []
    this.activePartners = []
  },
  methods: {
    ...mapMutations('app', ['toggleActiveSport', 'toggleActivePartner']),
  }
}
</script>

<style lang="scss" scoped>
.xo-live-sports::v-deep {
  display: flex;
  padding: 12px 0;
  padding-bottom: 0;

  @include max-width(767px) {
    padding-top: 20px;
  }

  @include max-width(510px) {
    flex-direction: column;
    align-items: flex-start;
  }

  span {
    color: #94a6aa;
    font-size: 16px;
    line-height: 18px;
    width: 72px;
    padding-top: 0.7rem;
    margin-right: 1.714rem;
    @include max-width(510px) {
      margin-bottom: 17px;
      padding-top: 0rem;
    }
  }

  .sports-list {
    display: flex;
    flex-wrap: wrap;

    .sport {
      margin-bottom: 12px;
      box-sizing: border-box;
      margin-right: 24px;
      position: relative;
      color: #65676b;
      padding: 9.5px 11px 9.5px 43px;
      cursor: pointer;
      user-select: none;
      border: 1px solid #557278;
      border-radius: 116px;
      display: flex;
      align-items: center;
      color: $white;

      @include max-width(1023px) {
        margin-bottom: 13px;
      }

      @include max-width(767px) {
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 10.5px 11px 10.5px 43px;
      }

      &:last-child {
        margin-right: 0;
      }

      ._icon {
        width: 22px;
        height: 22px;
        position: absolute;
        left: 12px;
        top: 6px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          max-width: 100%;
          min-width: 100%;
          max-height: 100%;
          min-height: 100%;
        }
      }

      ._name {
        font-size: 14px;
        line-height: 15px;

        @include max-width(767px) {
          font-size: 12px;
          line-height: 13px;
        }
      }

      &.active {
        color: #2a4e55;
        background-color: $white;
      }
    }
  }
}
</style>
