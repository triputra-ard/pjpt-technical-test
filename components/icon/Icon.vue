<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";
import * as lucideIcons from "lucide-vue-next";

const props = defineProps({
  class: String,
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 12,
  },
  color: String,
  strokeWidth: Number,
  defaultClass: String,
  fontControlled: { type: Boolean, default: false },
  library: {
    type: String,
    default: "lucide", // Options: "lucide", "mdi", "nuxt"
  },
});

const icon = computed(() => {
  if (props.library === "lucide") {
    const lucideIcon = lucideIcons[props.name];
    if (lucideIcon) {
      return lucideIcon;
    }
  } else if (props.library === "mdi") {
    return defineComponent({
      render() {
        const mdiClass = `mdi mdi-${props.name}`;
        return h("i", {
          class: cn(mdiClass, props.class),
          style: {
            fontSize: `${props.size}px`,
            color: props.color,
          },
        });
      },
    });
  } else if (props.library === "nuxt") {
    defineAsyncComponent(() => {
      return import(`@/assets/icons/${props.name}.svg`);
    });
  }

  console.warn(`Icon not found in library: ${props.library}`);
  return null;
});
</script>

<template>
  <component
    :class="cn(props.class)"
    :is="icon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :default-class="defaultClass"
    :font-controlled="fontControlled"
  />
</template>
