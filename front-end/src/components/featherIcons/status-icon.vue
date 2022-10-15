<template>
  <div>
    <feather
      v-if="field.item.status"
      title="active"
      type="circle"
      stroke="#FFFFFF"
      stroke-width="1"
      size="12px"
      fill="#81BA01"
      stroke-linejoin="round"
    >
    </feather>
    <feather
      v-if="!field.item.status"
      title="inactive"
      type="circle"
      stroke="#FFFFFF"
      stroke-width="1"
      size="12px"
      fill="#FBBC58"
      stroke-linejoin="round"
    >
    </feather>
  </div>
</template>

<script>
export default {
  props: ["field"],
};
</script>