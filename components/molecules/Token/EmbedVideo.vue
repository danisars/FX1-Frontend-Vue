<template>
  <div
    class="wistia_responsive_padding"
    style="padding: 56.25% 0 0 0; position: relative"
  >
    <div
      class="wistia_responsive_wrapper"
      style="height: 100%; left: 0; position: absolute; top: 0; width: 100%"
    >
      <div
        class="wistia_embed wistia_async_dynr8wobod videoFoam=true"
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
    recaptchaScript.setAttribute('src', 'https://fast.wistia.com/embed/medias/dynr8wobod.jsonp')
    recaptchaScript.setAttribute('src', 'https://fast.wistia.com/assets/external/E-v1.js')
    document.head.appendChild(recaptchaScript)
  }
}
</script>