<template lang="pug">
.xm-home-catalogs-fan-leaderboard.row.justify-end
  //.up-in-rank
  //  nuxt-img(src="/v2/Home/up-in-rank.png", width="329", format="webp")

  .fan-leaderboard
    nuxt-img(src="/v2/Home/footballer.png", format="webp")

  //.trending.row.items-center.justify-center
  //  nuxt-img(src="/v2/Home/trending.svg", width="24", height="24")

  //.boxer
  //  nuxt-img(src="/v2/Home/boxer.png", format="webp")

  //.level-up.row.items-center
  //  ._icon.row: nuxt-img(src="/v2/Home/medal.svg", width="32", height="32")
  //  .value.col
  //    h4 Level up!
  //    p You rank is upgraded

  .text-contents.flex-column.items-start
      .news.small-tags.text-center # news
      .games-in-overtime.small-tags.text-center # games in overtime
      .event-invites.small-tags.text-center # event invites
      .team-rivalries.small-tags.text-center # team rivalries
      .statistics.small-tags.text-center # statistics
      .frame-people
        nuxt-img(src="/v2/Home/frame-people.png", format="webp")

</template>

<script>
export default {
  name: 'XMHomeCatalogsFanLeaderboard',
}
</script>

<style lang="scss" scoped>
.xm-home-catalogs-fan-leaderboard::v-deep {
  position: relative;
  bottom: -70px;
  right: 50px;

  @include max-width(1025px) {
    bottom: 0px;
    right: 0px;
  }

  @include max-width(1000px) {
    bottom: -70px;
    right: 50px;
  }

  @include max-width(767px) {
    width: 100%;
    max-width: 300px;
    margin: 0 auto 30px;
    right: 0;
    bottom: -40px;
  }

  @include max-width(500px) {
    zoom: 0.8;
  }
  @include max-width(350px) {
    zoom: 0.7;
  }
  .text-contents {
    // red box text boxes placement start

    .small-tags {
      position: absolute;
      border-radius: 4px;
      padding: 16px 20px;
      z-index: 1;

      @include max-width(1025px) {
        padding: 10px 13px;
      }

      @include max-width(767px) {
        font-size: 10px;
        padding-left: 0;
        padding-right: 0;
      }
    }

    .news {
      top: -3%;
      right: 76%;
      width: 93px;
      background-color: white;
      color: black;

      @include max-width(1025px) {
        right: 80%;
      }

      @include max-width(1000px) {
        right: 74%;
      }

      @include max-width(767px) {
        right: 80%;
        width: 64px;
      }
    }

    .games-in-overtime {
      width: 190px;
      top: 17%;
      right: 70%;
      background-color: white;
      color: black;

      @include max-width(1025px) {
        top: 28%;
      }

      @include max-width(1000px) {
        top: 17%;
        right: 63%
      }

      @include max-width(767px) {
        top: 21%;
        right: 67%;
        width: 118px;
      }
    }

    .event-invites {
      background-color: #0c353e;
      width: 147px;
      top: 36%;
      right: 72%;
      
      @include max-width(1025px) {
        top: 61%;
      }

      @include max-width(1000px) {
        top: 35%;
        right: 66%
      }

      @include max-width(767px) {
        top: 45%;
        right: 70%;
        width: 104px;
      }
    }

    .team-rivalries {
      width: 153px;
      background-color: white;
      color: black;
      top: 54%;
      right: 59%;

      @include max-width(1025px) {
        top: 87%;
        right: 67%;
      }

      @include max-width(1000px) {
        top: 54%;
        right: 56%
      }

      @include max-width(767px) {
        top: 68%;
        right: 64%;
        width: 108px;
      }
    }

    .statistics {
      background-color: #0c353e;
      color: white;
      width: 118px;
      top: -7%;
      right: -17%;

      @include max-width(1025px) {
        right: -5%;
      }

      @include max-width(1000px) {
        right: -17%
      }

      @include max-width(767px) {
        top: -12%;
        right: -6%;
        width: 78px;
      }
    }
  }


  .frame-people {
    position: relative;
    z-index: 1;
    width: 48px;
    top: -112%;
    right: -57%;

    @include max-width(1025px) {
      top: 43%;
      right: 39%;
    }

    @include max-width(1000px) {
      top: -112%;
      right: -57%;
    }

    @include max-width(767px) {
      top: -26%;
      right: -38%;
    }
  }

  // red box text boxes placement end

  .up-in-rank {
    position: absolute;
    top: -35px;
    right: 2px;
    z-index: 0;
    
    @include max-width(767px) {
      width: 240px;
    }
  }

  .fan-leaderboard {
    position: relative;
    z-index: 1;
    width: 379px;

    img {
      border-radius: 12px;
    }

    @include max-width(767px) {
      width: 300px;
      height: 114px;
    }

    // @include max-width(550px) {
    //   width: 300px;
    //   img {
    //     width: 95%;
    //   }
    // }
  }

  .trending {
    width: 48px;
    height: 48px;
    border-radius: 5px;
    background-color: $white;
    z-index: 2;
    position: absolute;
    top: -20px;
    right: -10px;
  }

  .boxer {
    width: 130px;
    position: absolute;
    top: 60px;
    left: 10px;
    z-index: 2;

    @include max-width(767px) {
      left: 0;
      width: 90px;
    }
  }

  .level-up {
    background-color: $white;
    width: 210px;
    height: 70px;
    border-radius: 5px;
    padding: 10px 15px;
    position: absolute;
    bottom: 40px;
    left: 40px;
    z-index: 2;

    @include max-width(767px) {
      left: 0;
      width: 170px;
    }

    ._icon {
      margin-right: 15px;
      margin-top: 5px;

      @include max-width(767px) {
        width: 100%;
        max-width: 24px;
        margin-right: 10px;
      }
    }

    .value {
      color: $secondary;
      text-align: left;

      p {
        font-size: 0.8571rem;
        line-height: 14px;

        @include max-width(767px) {
          font-size: 0.7143rem;
          line-height: 12px;
        }
      }
    }
  }
}
</style>
