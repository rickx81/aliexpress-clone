<template>
  <div id="MainLayout" class="w-full fixed z-50">
    <div id="TopMenu" class="w-full bg-#fafafa border-b md:block hidden">
      <ul
        class="flex items-center justify-end text-xs text-#333 font-light px-2 h-10 bg-#fafafa max-w-1200px"
      >
        <li
          class="border-(r r-gray-400) px-3 hover:text-#ff4646 cursor-pointer"
        >
          Sell on AliExpress
        </li>
        <li
          class="border-(r r-gray-400) px-3 hover:text-#ff4646 cursor-pointer"
        >
          Cookie Preferences
        </li>
        <li
          class="border-(r r-gray-400) px-3 hover:text-#ff4646 cursor-pointer"
        >
          Help
        </li>
        <li
          class="border-(r r-gray-400) px-3 hover:text-#ff4646 cursor-pointer"
        >
          Buyer Protection
        </li>
        <li class="px-3 hover:text-#ff4646 cursor-pointer">
          <Icon name="ic:sharp-install-mobile" size="17" />
          App
        </li>
        <li
          class="relative flex items-center px-2.5 h-full hover:text-#ff4646 cursor-pointer transition-300"
          :class="
            isAccountMenuOpen
              ? 'bg-white border z-40 shadow-[0_15px_100px_40px_rgba(0,0,0,0.3)]'
              : 'border border-#fafafa'
          "
          @mouseenter="isAccountMenuOpen = true"
          @mouseleave="isAccountMenuOpen = false"
        >
          <Icon name="ph:user-thin" size="17" />
          Account
          <Icon name="mdi:chevron-down" size="15" class="ml-5" />

          <div
            id="AccountMenu"
            v-if="isAccountMenuOpen"
            class="absolute bg-white w-220px text-#333 z-40 top-38px -left-100px border-x border-b"
          >
            <div v-if="true">
              <div class="text-semibold text-15px my-4 px-3">
                Welcome To AliExpress!
              </div>
              <div class="flex items-center gap-1 px-3 mb-3">
                <NuxtLink
                  to="/auth"
                  class="bg-#FF4646 text-center w-full text-16px rounded-sm text-white font-semibold p-2"
                >
                  Login / Register
                </NuxtLink>
              </div>
              <div class="border-b" />
              <ul class="bg-white">
                <li
                  @click="navigateTo('/orders')"
                  class="text-13px py-2 px-4 w-full hover:bg-gray-200"
                >
                  My Orders
                </li>
                <li
                  v-if="true"
                  class="text-13px py-2 px-4 w-full hover:bg-gray-200"
                >
                  Sign out
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div id="MainHeader" class="flex items-center w-full bg-white">
      <div
        class="flex lg:justify-start justify-between gap-10 max-w-1150px w-full px-3 py-5 mx-auto"
      >
        <NuxtLink to="/" class="min-w-170px">
          <img width="170" src="assets/images/AliExpress-logo.png" />
        </NuxtLink>

        <div class="max-w-700px w-full md:block hidden">
          <div class="relative">
            <div
              class="flex items-center border-2 border-#FF4646 rounded-md w-full"
            >
              <input
                class="w-full placeholder-gray-400 text-sm pl-3 focus:outline-none"
                placeholder="kitchen accessories"
                type="text"
                v-model="searchItem"
              />
              <Icon
                v-if="isSearching"
                name="eos-icons:loading"
                size="25"
                class="mr-2"
              />
              <button class="flex items-center h-full p-1.5 px-2 bg-#FF4646">
                <Icon name="ph:magnifying-glass" size="20" color="#ffffff" />
              </button>
            </div>

            <div
              v-if="items && items.data"
              class="absolute bg-white max-w-700px h-auto w-full"
            >
              <div v-for="item in items.data" class="p-1">
                <NuxtLink
                  :to="`/item/${item.id}`"
                  class="flex items-center justify-between w-full cursor-pointer hover:bg-gray-100"
                >
                  <div class="flex items-center">
                    <img class="rounded-md" width="40" :src="item.url" />
                    <div class="truncate ml-2">{{ item.title }}</div>
                  </div>
                  <div class="truncate">${{ item.price / 100 }}</div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <NuxtLink to="/shoppingcart" class="flex items-center">
          <button
            class="relative md:block hidden"
            @mouseenter="isCartHover = true"
            @mouseleave="isCartHover = false"
          >
            <span
              class="absolute flex items-center justify-center -right-3px top-0 bg-#FF4646 h-17px min-w-17px text-xs text-white px-0.5 rounded-full"
            >
              9
              <!-- {{ userStore.cart.length }} -->
            </span>
            <div class="min-w-40px">
              <Icon
                name="ph:shopping-cart-simple-light"
                size="33"
                :color="isCartHover ? '#FF4646' : ''"
              />
            </div>
          </button>
        </NuxtLink>

        <button
          class="md:hidden block rounded-full p-1.5 -mt-4px hover:bg-gray-200"
        >
          <Icon name="radix-icons:hamburger-menu" size="33" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const isAccountMenuOpen = ref(false)
const isCartHover = ref(false)

const isSearching = ref(false)
const searchItem = ref('')
const items = ref(null)

const searchByName = async () => {
  isSearching.value = true
  // items.value = await useFetch(`/api/prisma/search-by-name/${searchItem.value}`)
  isSearching.value = false
}
watch(
  () => searchItem.value,
  async () => {
    if (!searchItem.value) {
      setTimeout(() => {
        items.value = null
        isSearching.value = false
      }, 500)
    }
  }
)
</script>