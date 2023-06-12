<template lang="pug">
.xo-home-section-catalogs
  .container.is-max-widescreen
    //h1.mb-5 Place for fans and <br> sporting communities:
    //h3.text-weight-thin.has-text-grey-light Support clubs, leagues, sporting organisations and engage with a like minded community
    .content-section.explore-events.row.items-center
      .left-content
        h2.mb-5 Be known as a proud supporter of your team or club
        h3.text-weight-thin Once you set up your profile and support your team or club on FX1, you’ll be granted access to their Locker Room and exist as an official supporter like never before

      .right-content.col
        img.desktop(
          src="~assets/images/Home/catalog-1.svg",
          style="max-height: 450px",
          alt="Be known as a proud supporter of your team or club"
        )

    .content-section.claim-medal.row.items-center
      .left-content
        h2.mb-5 Choose the discussions you want to be part of
        h3.text-weight-thin Browse through a range of channels from your clubs Locker Room, find content and discussion on the upcoming game or race, injuries, news, athlete reports & more

      .right-content.col
        img.desktop(
          src="~assets/images/Home/choose-the-discussions.png",
          style="max-height: 450px",
          alt="Choose the discussions you want to be part of"
        )

    .content-section.celebrate.row.items-center
      .left-content
        h2.mb-5 Move up in rank for being an engaged supporter
        h3.text-weight-thin Support your club and spend time in their Locker Room, engage with supporters, be helpful and answer questions and watch as you move up in rank in the supporter ladder

      .right-content.col
        img.desktop(
          src="~assets/images/Home/catalog-3.png",
          alt="Move up in rank for being an engaged supporter",
          width="420",
          height="435"
        )

    .content-section.be-right.row.items-center
      .left-content
        h2.mb-5 Start, or bring across your fan club or sports community
        h3.text-weight-thin Do you have a sporting community or a passionate group of friends? Start your own Locker Room, create channels, grow your communities fan base & benefit like never before

      .right-content.col
        img.desktop(
          src="~assets/images/Home/bring-across.png",
          style="max-height: 450px",
          alt="Start, or bring across your fan club or sports community"
        )

    .content-section.reply.row.items-center
      .left-content
        h2.mb-5 Reply to comments, or start a new conversation
        h3.text-weight-thin Feel free to start a new discussion on whatever is on your mind about your club, or reply to an existing thread that is hot in the moment

      .right-content.col
        img.desktop(
          src="~assets/images/Home/catalog-5.png",
          width="411",
          height="398",
          alt="Reply to comments, or start a new conversation"
        )
</template>

<script>
export default {
  name: 'XOHomeCatalogs',
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-home-section-catalogs::v-deep {
  background-color: #08252c;
  padding: 50px 0;

  @include max-width(768px) {
    padding: 50px 0;
  }

  h2 {
    width: 100%;
    max-width: 750px;

    @include max-width(768px) {
      max-width: 400px;
    }
  }

  h3 {
    @include max-width(768px) {
      font-size: 1.1429rem !important;
    }
  }

  // global left content and right content
  .left-content {
    max-width: 600px !important;
    @include max-width(767px) {
      max-width: 100% !important;
      padding-right: 0 !important;
      h2,
      h3 {
        max-width: 100% !important;
      }
    }
  }

  .right-content {
    @include max-width(767px) {
      text-align: center;
      margin-bottom: 30px;
    }
  }

  .content-section {
    position: relative;
    padding: 30px 50px;
    border-radius: 10px;
    margin-top: 100px;
    margin-bottom: 130px;
    min-height: 450px;

    @include max-width(767px) {
      padding: 30px 20px;
    }

    &::before {
      content: '';
      border-bottom: 70px solid transparent;
      border-left: 100px solid transparent;
      border-right: 100px solid transparent;
      width: calc(100% - 10px);
      position: absolute;
      top: -69px;
      left: 5px;

      @include max-width(767px) {
        border-bottom-width: 50px;
        border-left-width: 70px;
        border-right-width: 70px;
        top: -49px;
      }
    }

    &::after {
      content: '';
      background-image: linear-gradient(#08252c, rgba(8, 37, 44, 0));
      position: absolute;
      top: -70px;
      left: 0;
      width: 100%;
      height: 70px;

      @include max-width(767px) {
        height: 50px;
        top: -50px;
      }
    }
  }

  .explore-events {
    background-color: $primary;

    &::before {
      border-bottom-color: $primary;
    }

    .left-content {
      width: 100%;
      max-width: 500px;
      padding-right: 100px;

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(768px) {
        padding-right: 80px;
      }

      @include max-width(767px) {
        width: 100%;
        order: 2;
      }

      h3 {
        width: 100%;
        max-width: 350px;
      }
    }

    .right-content {
      @include max-width(767px) {
        flex: none;
        width: 100%;
        order: 1;
      }
    }
  }

  .claim-medal {
    background-color: #886bf2;

    &::before {
      border-bottom-color: #886bf2;
    }

    .left-content {
      width: 100%;
      max-width: 500px;
      padding-right: 100px;

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(768px) {
        padding-right: 80px;
      }

      @include max-width(767px) {
        width: 100%;
        order: 2;
      }

      h3 {
        width: 100%;
        max-width: 350px;
      }
    }

    .right-content {
      @include max-width(767px) {
        flex: none;
        width: 100%;
        order: 1;
      }
    }
  }

  .celebrate {
    background-color: #ffaf23;

    &::before {
      border-bottom-color: #ffaf23;
    }

    .left-content {
      width: 100%;
      max-width: 500px;
      padding-right: 100px;

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(768px) {
        padding-right: 80px;
      }

      @include max-width(767px) {
        width: 100%;
        order: 2;
      }

      h3 {
        width: 100%;
        max-width: 350px;
      }
    }

    .right-content {
      @include min-width(767px) {
        position: absolute;
        bottom: -7px;
        right: 50px;
      }
      @include max-width(767px) {
        flex: none;
        width: 100%;
        order: 1;
      }
    }
  }

  .be-right {
    background-color: #2a4e55;

    &::before {
      border-bottom-color: #2a4e55;
    }

    .left-content {
      width: 100%;
      max-width: 500px;
      padding-right: 100px;

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(768px) {
        padding-right: 80px;
      }

      @include max-width(767px) {
        width: 100%;
        order: 2;
      }

      h3 {
        width: 100%;
        max-width: 350px;
      }
    }

    .right-content {
      @include max-width(767px) {
        flex: none;
        width: 100%;
        order: 1;
      }
    }
  }

  .reply {
    color: #1b424a !important;
    background-color: #ffffff;

    &::before {
      border-bottom-color: #ffffff;
    }

    .left-content {
      width: 100%;
      max-width: 500px;
      padding-right: 100px;

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(768px) {
        padding-right: 80px;
      }

      @include max-width(767px) {
        width: 100%;
        order: 2;
      }

      h3 {
        width: 100%;
        max-width: 350px;
      }
    }

    .right-content {
      @include min-width(767px) {
        position: absolute;
        bottom: -7px;
        right: 50px;
      }

      @include max-width(767px) {
        flex: none;
        width: 100%;
        order: 1;
      }
    }
  }
}
</style>
