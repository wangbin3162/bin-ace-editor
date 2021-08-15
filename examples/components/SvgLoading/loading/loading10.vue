<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       viewBox="0 0 100 100"
       preserveAspectRatio="xMidYMid">
    <circle cx="30" cy="50" fill="#e90c59" r="20">
      <animate attributeName="cx" repeatCount="indefinite" dur="1.3157894736842106s" keyTimes="0;0.5;1"
               values="30;70;30" begin="-0.6578947368421053s"></animate>
    </circle>
    <circle cx="70" cy="50" fill="#46dff0" r="20">
      <animate attributeName="cx" repeatCount="indefinite" dur="1.3157894736842106s" keyTimes="0;0.5;1"
               values="30;70;30" begin="0s"></animate>
    </circle>
    <circle cx="30" cy="50" fill="#e90c59" r="20">
      <animate attributeName="cx" repeatCount="indefinite" dur="1.3157894736842106s" keyTimes="0;0.5;1"
               values="30;70;30" begin="-0.6578947368421053s"></animate>
      <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1"
               dur="1.3157894736842106s" repeatCount="indefinite"></animate>
    </circle>
  </svg>
</template>

<script>
export default {
  name: 'loading10'
}
</script>
