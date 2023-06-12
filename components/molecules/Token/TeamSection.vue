<template lang="pug">
.token-team-section.row
  .container.token-container.text-center
    h1 Team
    .top-margin-b
    .row
      .col.left-side
        a(href="https://assuredefi.com/projects/fx1/", target="_blank")
          img(
            src="~assets/images/Token/damien.png",
            alt="Damien Team Member"
          )
        h2 Damien
        .top-margin-a
        p.token-p Co-Founder & CEO
        p.token-p California
      .col.right-side
        a(href="https://assuredefi.com/projects/fx1/", target="_blank")
          img(
            src="~assets/images/Token/trent.png",
            alt="Trent Team Member"
          )
        h2 Trent
        .top-margin-a
        p.token-p Co-Founder & CEO
        p.token-p California
      
          
</template>

<script>
export default {
  name: 'TeamSection',
}
</script>

<style lang="scss" scoped>
.token-team-section::v-deep {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0px 0 150px;
  z-index: 2;

  .top-margin-a {
    margin-top: 25px;
  }

  .top-margin-b {
    margin-top: 50px;
  }

  // Mobile
  @include max-width(500px) {
    padding: 50px 0 50px;

    .top-margin-b {
      margin-top: 25px;
    }

    .top-margin-a {
      margin-top: 0px !important;
    }

    .right-side {
      margin-top: 50px !important;
    }
  }
}
</style>
