<template lang="pug">
.xm-next-game-slide.flex-column.justify-between
  .actions
    .live-watch.row.items-center.justify-center
      ._icon: img(src="~assets/images/Club/play.svg")
      ._label Live watch
  .details
    h1 Next Arsenal game:

    .contents.row.items-center.justify-between
      .left-content.row
        XAAvatar(image="https://picsum.photos/100", size="48px")
        .left-content-details.ml-4
          .row.mb-1
            .date.mr-3 {{ date }}
            .address Tasmania, Australia
          .price AUD $50.00 &mdash; $150.00

      .right-content
        b-button(type="is-white", outlined) Watch Live
        b-button.ml-4(type="is-primary") Buy Tickets
</template>

<script>
import moment from 'moment'

export default {
  name: 'XMNextGameSlide',
  components: {
    XAAvatar: () => import('~/components/atoms/Avatar'),
  },
  computed: {
    date() {
      const date = new Date()
      const isCurrentDate = moment(date).isSame(new Date(), 'day')

      if (isCurrentDate) {
        return moment(date).format('[Today, ] MMMM DD')
      }
      return moment(date).format('MMMM DD, YYYY')
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-next-game-slide::v-deep {
  background-image: url('https://picsum.photos/1000');
  background-size: cover;
  background-position: center;
  min-height: 600px;
  border-radius: 10px;
  padding: 35px 30px;
  position: relative;

  &::before {
    content: '';
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    border-radius: 10px;
  }

  .actions {
    position: relative;
    z-index: 1;

    .live-watch {
      background-color: $primary;
      color: $white;
      font-weight: 300;
      width: 120px;
      height: 32px;
      border-radius: 30px;

      ._icon {
        margin-top: 4px;
        margin-right: 7px;
      }
    }
  }

  .details {
    background-color: #886bf2;
    border-radius: 10px;
    padding: 30px;
    position: relative;
    z-index: 1;

    .contents {
      border-top: 1px solid rgba($white, 0.2);
      margin-top: 20px;
      padding: 20px 0 0;

      .left-content {
        font-weight: 300;
        color: rgba($white, 0.8);

        .xa-avatar {
          border: 2px solid $white;
        }
      }

      .right-content {
        .button {
          width: 155px;
          height: 42px;
          text-transform: uppercase;
        }
      }
    }
  }
}
</style>
