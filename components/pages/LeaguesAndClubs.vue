<template lang="pug">
.page-content
  .container.is-max-desktop
    h1 A new way to engage with your fans and members
    p The place for sports governing bodies, clubs, and leagues to generate increased revenue while at the same time growing fan engagement.
    p [ APPLY FOR EARLY ACCESS ]

    h3 Create your clubs Locker Room
    p Locker Rooms are uniquely created by each club or league and offer their supporters a new digital experience only accessible on FX1.

    h3 Add & customize channels to your liking
    p Channels are the heartbeat of a Locker Room. Create as many channels as you feel is needed, and customize them how you see fit.

    h3 Invite your team and all your fans
    p Easily share your Locker Room with all your fans, and with just a few clicks invite your staff and management team to help oversee the room.

    h3 Give your fans and members a new game or race day experience
    p The day of the game (or event) is exciting, and now you can bring it to the next level by having a channel dedicated to the day where all your fans will be.

    h3 Your new #1 marketing channel
    p For years sporting organizations and clubs have been forced to invest their time and hard
      | earned money into social platforms that were never fit for purpose. FX1 changes all of that,
      | not only providing a home for your fans and supporters to talk and engage with each other,
      | but a way for you to generate additional income.

    ul
      li Create digital membership tiers that your fans and supporters can purchase
      li Generate revenue from membership sales, including any secondary sales
      li Increase your percentage of supporters to paid members, especially from the ~95% of fans that never attend a game live
      li Earn new fans based on the number of supporters in your Locker Room and the engagement and noise those supporters generate
      li Use FX1 for your on ground ticketing, and benefit from every sale including any secondary sales from supporters, or even scalpers
    p <i>* Digital Membership &amp; Ticketing Offering - Coming Soon</i>

    h3 Who is FX1?
    p 1. Register your interest using the form below
    p 2. We’ll review and decide if your a good fit for our beta program
    p 3. If approved, your Locker Room will be created, and you can start creating channels
    p 4. Invite all your members and fans to come and be part of your Locker Room
</template>

<script>
export default {
  name: 'XPLeaguesAndClubs',
}
</script>

<style lang="scss" scoped>
.page-content::v-deep {
  min-height: calc(100vh - 406px);
  border-bottom: 1px solid #1c3e45;
  background-color: #0c353e;
  padding: 50px 0;

  a {
    color: #1155cc !important;
  }

  .bottom-border {
    border-bottom: 1px solid #1c3e45;
  }

  h1 {
    font-size: 3rem;
    line-height: 1.2;
    margin-bottom: 30px;
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
      font-size: 1.1429rem;
      font-weight: 300;
      margin-bottom: 15px;
      margin-left: 15px;
      list-style: disc;

      ul {
        li {
          //list-style-type: none;
          list-style: circle;
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
