<template>
  <MainLayout>
    <div id="AddressPage" class="mt-4 max-w-[500px] mx-auto px-2">
      <div class="mx-auto bg-white rounded-lg p-3">
        <div class="text-xl text-bold mb-2">Address Details</div>
        <form @submit.prevent="submit()">
          <TextInput
            v-model:value="contactName"
            class="w-full"
            placeholder="Contact Name"
            inputType="text"
            :error="error && error.type == 'contactName' ? error.message : ''"
          />

          <TextInput
            v-model:value="address"
            class="w-full mt-2"
            placeholder="Address"
            inputType="text"
            :error="error && error.type == 'address' ? error.message : ''"
          />

          <TextInput
            v-model:value="zipCode"
            class="w-full mt-2"
            placeholder="Zip Code"
            inputType="text"
            :error="error && error.type == 'zipCode' ? error.message : ''"
          />

          <TextInput
            v-model:value="city"
            class="w-full mt-2"
            placeholder="City"
            inputType="text"
            :error="error && error.type == 'city' ? error.message : ''"
          />

          <TextInput
            v-model:value="country"
            class="w-full mt-2"
            placeholder="Country"
            inputType="text"
            :error="error && error.type == 'country' ? error.message : ''"
          />

          <button
            :disabled="isWorking"
            type="submit"
            class="mt-6 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
          >
            <div v-if="!isWorking">Update Address</div>
            <Icon v-else name="eos-icons:loading" size="25" class="mr-2" />
          </button>
        </form>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const user = useSupabaseUser()

let contactName = ref(null)
let address = ref(null)
let zipCode = ref(null)
let city = ref(null)
let country = ref(null)

const currentAddress = ref()
let isUpdate = ref(false)
let isWorking = ref(false)
let error = ref(null)

watchEffect(async () => {
  userStore.isLoading = false

  const res = await $fetch(`/api/prisma/get-address-by-user/${user.value.id}`)
  if (res && res.statusCode === 200) {
    currentAddress.value = res.address
    if (res.address) {
      contactName.value = res.address.name
      address.value = res.address.address
      zipCode.value = res.address.zipcode
      city.value = res.address.city
      country.value = res.address.country

      isUpdate.value = true
    }
  }

  userStore.isLoading = false
})

const submit = async () => {
  isWorking.value = true
  error.value = null

  if (!contactName.value) {
    error.value = {
      type: 'contactName',
      message: 'A contact name is required',
    }
  } else if (!address.value) {
    error.value = {
      type: 'address',
      message: 'An address is required',
    }
  } else if (!zipCode.value) {
    error.value = {
      type: 'zipCode',
      message: 'A zip code is required',
    }
  } else if (!city.value) {
    error.value = {
      type: 'city',
      message: 'A city is required',
    }
  } else if (!country.value) {
    error.value = {
      type: 'country',
      message: 'A country is required',
    }
  }

  if (error.value) {
    isWorking.value = false
    return
  }

  if (isUpdate.value) {
    await useFetch(`/api/prisma/update-address/${currentAddress.value.id}`, {
      method: 'PATCH',
      body: {
        userId: user.value.id,
        name: contactName.value,
        address: address.value,
        zipCode: zipCode.value,
        city: city.value,
        country: country.value,
      },
    })

    isWorking.value = false

    return navigateTo('/checkout')
  }

  await useFetch(`/api/prisma/add-address/`, {
    method: 'POST',
    body: {
      userId: user.value.id,
      name: contactName.value,
      address: address.value,
      zipCode: zipCode.value,
      city: city.value,
      country: country.value,
    },
  })

  isWorking.value = false

  return navigateTo('/checkout')
}
</script>
