<template>
  <div
    class="wistia_responsive_padding"
    style="padding: 56.25% 0 0 0; position: relative; border: 1px solid #385960; box-shadow: 0px 25px 77px -10px rgba(255, 255, 255, 0.2); border-radius: 5px;"
  >
    <div
      class="wistia_responsive_wrapper"
      style="height: 100%;left: 0;position: absolute;top: 0;margin: 1px;width: 99.90%;">
      <div
        class="wistia_embed wistia_async_f3zk2jfsyq videoFoam=true"
        style="height: 100%; position: relative; width: 100%"
      >
        <div
          class="wistia_swatch"
          style="
            height: 100%;
            left: 0;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            top: 0;
            transition: opacity 200ms;
            width: 100%;
          "
        >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    const recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute(
      'src',
      'https://fast.wistia.com/embed/medias/dynr8wobod.jsonp'
    )
    recaptchaScript.setAttribute(
      'src',
      'https://fast.wistia.com/assets/external/E-v1.js'
    )
    document.head.appendChild(recaptchaScript)
  },
}
</script>
