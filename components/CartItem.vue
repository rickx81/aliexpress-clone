<template>
  <div class="flex justify-start my-2">
    <div class="my-auto">
      <div
        class="flex items-center justify-start p-0.5 cursor-pointer"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
      >
        <div
          class="flex items-center justify-center h-20px w-20px rounded-full border mr-5 ml-2"
          :class="[
            isHover ? 'border-#FD374F' : 'border-gray-300',
            isSelected ? 'bg-#FD374F' : '',
          ]"
          @click="isSelected = !isSelected"
        >
          <div class="h-8px w-8px rounded-full bg-white" />
        </div>
      </div>
    </div>

    <img
      class="rounded-md object-contain md:w-150px w-90px bg-gray-100"
      :src="product.url"
    />

    <div class="overflow-hidden pl-2 w-full">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-between truncate">
          <span
            class="sm:block hidden bg-#FD374F text-white text-9px font-semibold px-1.5 rounded-sm min-w-80px"
          >
            Welcome Deal
          </span>
          <div class="truncate sm:pl-2">{{ product.title }}</div>
        </div>
        <button
          class="mx-3 sm:block hidden -mt-0.5 bg-transparent hover:text-red-500 transition-color"
          @click="removeFromCart()"
        >
          <Icon name="material-symbols:delete-outline" size="20" />
        </button>
      </div>

      <div class="text-xl font-semibold">
        $ <span class="font-bold">{{ product.price.toFixed(2) }}</span>
      </div>

      <p class="text-#009A66 text-xs font-semibold pt-1">
        Free 11-day delivery over ￡8.28
      </p>

      <p class="text-#009A66 text-xs font-semibold pt-1">Free Shipping</p>

      <div class="flex items-center justify-end">
        <button
          @click="removeFromCart()"
          class="sm:hidden block -mt-0.5 bg-transparent hover:text-red-500 transition-color"
        >
          <Icon name="material-symbols:delete-outline" size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Products } from '@prisma/client';
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const props = defineProps<{
  product: Products
  onSelected?: (id: number, selected: boolean) => void
}>()
const { product } = toRefs(props)

const isHover = ref(false)
const isSelected = ref(false)

const removeFromCart = () => {
  userStore.cart.forEach((prod, index) => {
    if (prod.id === product.value.id) {
      userStore.cart.splice(index, 1)
    }
  })
}

watch(
  () => isSelected.value,
  value => {
    props.onSelected?.(product.value.id, value)
  }
)
</script>
