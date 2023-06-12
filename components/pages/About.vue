<template lang="pug">
.page-content
  .container.is-max-desktop
    h1(style="margin-top: 0") About Us

    h2 Our Vision
    p To redefine how Gen Z and Millennial's consume and interact with sports.

    h2 Our Mission
    p We are on a mission to evolve and enhance the overall experience of watching sports online for Gen Z’s
      | and young Millennial communities. FX1 will grow viewership by enabling them to connect and engage socially
      | while watching online sports with their friends, while also having the ability to earn income, prizes, and clout.

    h2 What We Do
    p Our product is an interactive live messaging platform that seamlessly integrates and enhances the streamed sports
      | game day experience, making it easier for fans to connect and engage socially while watching sports online.

    p Fans will be able to browse all their streamed sports platforms in one place, watch live sports online, chat
      | with friends anywhere, and earn rewards and prizes while watching sports.

    p FX1 will partner with streaming platforms, sporting leagues, and media rights holders. Our platform complements
      | and enhances the online experience for its customers.

    p Unlike the current streaming platforms that offer streamed content to customers in return for a fee, FX1 leverages
      | this streamed content by overlaying it with proprietary-built technology that further enhances the experience.

    p FX1 Pty Ltd is an Australian-owned company. It also owns FIT3 LLC, which represents the
      | North American arm of FX1. Our North American team is based out of California and supports
      | FX1 across product development, sales, and marketing.

    p To get in touch please shoot us an email to #[a(href="mailto:hello@fx1.io") #[strong hello@fx1.io]].
</template>

<script>
export default {
  name: 'XPAbout',
}
</script>

<style lang="scss" scoped>
.page-content::v-deep {
  min-height: calc(100vh - 406px);
  border-bottom: 1px solid #1c3e45;
  background-color: #0c353e;
  padding: 50px;

  a {
    color: $white;
    text-decoration: underline;
  }

  .bottom-border {
    border-bottom: white 2px solid;
  }

  h1 {
    font-size: 3rem;
    line-height: 1.2;
    margin: 40px 0 20px;
    letter-spacing: 0;
  }

  h2 {
    font-size: 1.5714rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1.5714rem;
    line-height: 1.2;
    margin: 40px 0 20px;
  }

  p {
    font-size: 1.1429rem;
    font-weight: 300;
    margin-bottom: 20px;
  }

  ul {
    margin: 0;
    padding: 0;

    li {
      list-style-type: none;
      font-size: 1.1429rem;
      font-weight: 300;
      margin-bottom: 0.7143rem;
      margin-left: 1.4286rem;
      //list-style: disc;

      ul {
        li {
          list-style-type: none;
          //list-style: circle;
        }
      }
    }
  }

  pre {
    display: block;
    padding: 0.7143rem;
    word-break: break-all;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 12px;
    white-space: pre-line;
    margin-bottom: 0.7143rem;

    span {
      display: block;
    }
  }
}
</style>
