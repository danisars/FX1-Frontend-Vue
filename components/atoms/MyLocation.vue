<template lang="pug">
.xa-my-location
  .in-mobile-menu(v-if="inMobileMenu")
    span.edit(@click="userLocationEditFlag = true", v-if="!userLocationEditFlag")
      b-icon(icon="map-marker")
      p(v-if="!myLocation") Click to set your location
      .notInLine(v-if="myLocation")
        .inLine
          p.muted-text.smaller-text Your location is
        .inLine
          p.marginR {{ myLocation }}
          b-icon(icon="pencil")
    span.editText(v-if="userLocationEditFlag")
      XAFormsInput(
        v-model="zipCode",
        placeholder="Enter your Zip Code",
        iconOnRight="map-marker",
        :error="errorMsg"
      )
      b-button(
        type="save-button-desktop",
        @click.prevent="saveLocation()"
      ) Save
  //- div(v-if="inMobileMenu")
  //-   .error-msg-in-mobile(v-if="errorMsg")
  //-     p {{ errorMsg }}

  .desktop(v-if="!inMobileMenu")
    span.edit(@click="userLocationEditFlag = true", v-if="!userLocationEditFlag")
      b-icon(icon="map-marker")
      p(v-if="!myLocation") Click to set your location
      .notInLine(v-if="myLocation")
        .inLine
          p.muted-text.smaller-text Your location is
        .inLine
          p.marginR {{ myLocation }}
          b-icon(icon="pencil")
    span.editText(v-if="userLocationEditFlag")
      XAFormsInput(
        v-model="zipCode",
        placeholder="Enter your Zip Code",
        iconOnRight="map-marker"
        :error="errorMsg"
      )
      b-button(
        type="save-button-desktop",
        @click.prevent="saveLocation()"
      ) Save
  //- div(v-if="!inMobileMenu")
  //-   .error-msg-desktop(v-if="errorMsg")
  //-     p {{ errorMsg }}

  .tablet(v-if="!inMobileMenu")
    span.edit(@click="showFloatingLocationBoard = !showFloatingLocationBoard")
      b-icon(icon="map-marker", v-if="showFloatingLocationBoard")
      b-icon(icon="map-marker", v-if="!showFloatingLocationBoard")
    .floating-board(v-if="showFloatingLocationBoard")
      .set-location(v-if="!userLocationEditFlag && !myLocation", @click="userLocationEditFlag = true")
        .inLine
          b-icon(icon="map-marker")
          p Click to set your location
      .notInLine(v-if="myLocation && !userLocationEditFlag", @click="userLocationEditFlag = true")
        .inLine
          b-icon(icon="map-marker")
          p.muted-text.smaller-text Your location is
        .inLine
          p.marginR {{ myLocation }}
          b-icon(icon="pencil")
      span.editText(v-if="userLocationEditFlag")
        XAFormsInput(
          v-model="zipCode",
          placeholder="Enter your Zip Code",
          iconOnRight="map-marker"
          :error="errorMsg"
        )
        b-button(
          type="save-button-tablet",
          @click.prevent="saveLocation()"
        ) Save
      //- div.error-msg-tablet(v-if="errorMsg")
      //-   p {{ errorMsg }}

</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XAMyLocation',
  components: {
    XAFormsInput: () => import('~/components/atoms/Forms/Input')
  },
  data() {
    return {
      userNameDefault: null,
      userAvatarDefault: null,
      userLocationEditFlag: false,
      showFloatingLocationBoard: false,
      myLocation: null,
      zipCode: null,
      errorMsg: null,
    }
  },
  props: {
    inMobileMenu: { type: Boolean, default: false },
  },
  computed: {
    ...mapFields('user', ['userProfile', 'userName', 'userAvatar']),
    name() {
      return (
        this.$store.state.user.userName ||
        this.userProfile?.username ||
        this.userProfile?.name ||
        this.$store.state.auth.displayName ||
        null
      )
    },
    avatarURL() {
      return (
        this.$store.state.user.userAvatar ||
        this.userProfile?.Avatar?.PhotoURL ||
        null
      )
    },
  },
  methods: {
    async saveLocation() {
      try {
        await this.$api.addZipCode({ zipCode: this.zipCode }).then((res) => {
          if(res) {
            this.myLocation = '' + res.addZipCode.city + ' ' + res.addZipCode.state + ' ' + res.addZipCode.zip;
          }
        });
        this.userLocationEditFlag = false;
        this.showFloatingLocationBoard = false;
        localStorage.setItem("user-zipcode-fx1", this.myLocation);
      } catch (error) {
        this.errorMsg = "Please enter a valid US zip code";
      }
    },
    async getLocation() {
      if(!this.isLoggedIn) {
        this.myLocation = localStorage.getItem("user-zipcode-fx1");
      } else {
        try {
          const userLocationData = await this.$api.getMyLocation();
          if(userLocationData.Me.zipCode) {
            this.myLocation = '' + userLocationData.Me.ZipCode.city + ' ' + userLocationData.Me.ZipCode.state + ' ' + userLocationData.Me.ZipCode.zip;
            this.zipCode = userLocationData.Me.ZipCode.zip;
            localStorage.setItem("user-zipcode-fx1", this.myLocation);
          }
        } catch (error) {
          error?.response?.errors.forEach((error) => {
            this.$toast.success(error.message, {
              duration: 5000,
              position: 'bottom-left',
              className: 'fx1-success',
              iconPack: 'mdi',
              icon: 'alert-circle-outline',
            })
          })
        }
      }
    }
  },
  watch: {
    '$store.state.auth.token': {
      deep: true,
      handler() {
        this.userNameDefault =
          this.$store.state.user.userName || this.userProfile?.username
        this.userAvatarDefault =
          this.$store.state.user.userAvatar ||
          this.userProfile?.Avatar?.PhotoURL
      },
    },
    zipCode: function() {
      this.errorMsg = null;
    }
  },
  async created() {
    this.getLocation();
  }
}
</script>
<style lang="scss" scoped>
  .xa-my-location::v-deep {
    .error-input {
      border: 1px solid $primary !important;
    }
    .desktop {
      display: flex;
      align-items: center;
      padding-right: 30px;
      white-space: nowrap;
      cursor: pointer;

      i {
        padding-right: 10px;
        color: white;
      }

      @include max-width(1260px) {
        display: none;
      }
    }

    .in-mobile-menu {
      display: flex;
      align-items: center;
      padding-right: 30px;
      white-space: nowrap;
      cursor: pointer;

      i {
        padding-right: 10px;
        color: white;
      }
    }

    .tablet {
      position: relative;
      display: none;
      align-items: center;
      padding-right: 10px;
      white-space: nowrap;
      cursor: pointer;
      // Mobile
      @include max-width(1260px) {
        display: flex;
      }

      i {
        padding-right: 10px;
        color: $grey-mute;
      }
    }

    .save-button-desktop {
      background-color: transparent;
      border: 1px solid $grey-mute !important;
      width: 125px !important;
      height: 42px !important;
      color: white !important;
      line-height: 0.5 !important;
    }

    .save-button-tablet {
      border: 1px solid $grey-mute !important;
      width: 125px !important;
      height: 42px !important;
      color: #2a4e55 !important;
      line-height: 0.5 !important;
    }

    .error-msg-in-mobile,
    .error-msg-desktop,
    .error-msg-tablet {
      position: relative;
      p {
        color: $primary !important;
        font-size: 10px;
      }
    }
    .error-msg-desktop {
      @include max-width(1260px) {
        display: none;
      }
    }
    .error-msg-tablet {
      @include max-width(1260px) {
        display: block;
      }
    }

    .floating-board {
      // background-image: url('~assets/images/LockerRoom/close-secondary.svg');
      // background-repeat: no-repeat;
      // background-position: 96% 46%;
      // background-size: 10px 10px;
      position: absolute;
      padding: 10px 15px 10px 15px;
      right: -70%;
      top: 100%;
      margin-top: 60%;
      z-index: 1;
      background-color: white;
      border-radius: 5px;
      box-shadow: 0px 4px 10px rgba(10, 39, 46, 0.15);

      p {
        color: black;
      }

      input {
        color: black !important;
      }

      .button {
        height: 100%;
        min-height: 40px;
        margin-left: 10px;
        width: 100%;
      }
    }

    .set-location {
      display: flex;
    }

    .edit,
    .editText {
      display: flex;
    }

    .notInLine {
      display: block;
      text-align: left;
    }

    .inLine {
      display: flex;
      align-items: center;

      .mdi-24px.mdi:before {
        font-size: 15px !important;
      }
    }

    .marginR {
      margin-right: 10px;
    }

    input {
      background-color: transparent;
      width: 100%;
      height: 100%;
      max-height: 40px;
      min-width: 210px;
      border: 1px solid $grey-mute !important;
      color: white !important;
      line-height: 0.5 !important;
    }

    .smaller-text {
      font-size: 12px;
    }

    .button {
      height: 100%;
      min-height: 40px;
      margin-left: 10px;
    }

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: $grey-mute !important;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: $grey-mute !important;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
      color: $grey-mute !important;
    }

    p.muted-text {
      color: $grey-mute;
    }
  }
</style>
