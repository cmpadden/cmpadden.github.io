<script setup>
import { Bars3Icon } from "@heroicons/vue/20/solid";

const route = useRoute();
</script>

<template>
  <nav class="container mx-auto py-5">
    <div class="flex items-center text-gray-200">
      <div class="flex-1" />
      <div class="flex items-center space-x-2">
        <HeadlessMenu as="div" class="relative z-50 inline-block text-left">
          <div>
            <HeadlessMenuButton class="text-white hover:text-orange-500">
              <div class="text-2xl">&bull;&bull;&bull;</div>
            </HeadlessMenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <HeadlessMenuItems
              class="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-black/80 text-white shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-sm focus:outline-none"
            >
              <div class="px-1 py-1">
                <HeadlessMenuItem v-slot="{ active }">
                  <NuxtLink to="/">
                    <button
                      :class="[
                        active ? 'bg-orange-500/50 text-white' : 'text-white',
                        $route.path === '/' ? 'bg-orange-500' : '',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                    >
                      <svg 
                        class="mr-2 inline h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clip-rule="evenodd" />
                      </svg>
                      <span class="translate-y-0.5">Home</span>
                    </button>
                  </NuxtLink>
                </HeadlessMenuItem>

                <HeadlessMenuItem v-slot="{ active }">
                  <NuxtLink to="/about">
                    <button
                      :class="[
                        active ? 'bg-orange-500/50 text-white' : 'text-white',
                        $route.path === '/about' ? 'bg-orange-500' : '',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                    >
                      <svg
                        class="mr-2 inline h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="translate-y-0.5">About</span>
                    </button>
                  </NuxtLink>
                </HeadlessMenuItem>

                <HeadlessMenuItem v-slot="{ active }">
                  <a href="/articles">
                    <button
                      :class="[
                        active ? 'bg-orange-500/50 text-white' : 'text-white',
                        $route.path === '/articles' ? 'bg-orange-500' : '',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                    >
                      <svg
                        class="mr-2 inline h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      <span class="translate-y-0.5">Blog</span>
                    </button>
                  </a>
                </HeadlessMenuItem>

                <HeadlessMenuItem v-slot="{ active }">
                  <a href="/playground">
                    <button
                      :class="[
                        active ? 'bg-orange-500/50 text-white' : 'text-white',
                        $route.path === '/playground' ? 'bg-orange-500' : '',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                    >
                      <svg
                        class="mr-2 inline h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                        />
                      </svg>
                      <span class="translate-y-0.5">Experiments</span>
                    </button>
                  </a>
                </HeadlessMenuItem>

                <HeadlessMenuItem v-slot="{ active }">
                  <a href="/talks">
                    <button
                      :class="[
                        active ? 'bg-orange-500/50' : '',
                        $route.path === '/talks' ? 'bg-orange-500' : '',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                    >
                      <svg
                        class="mr-2 inline h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path d="M13.92 3.845a19.362 19.362 0 0 1-6.3 1.98C6.765 5.942 5.89 6 5 6a4 4 0 0 0-.504 7.969 15.97 15.97 0 0 0 1.271 3.34c.397.771 1.342 1 2.05.59l.867-.5c.726-.419.94-1.32.588-2.02-.166-.331-.315-.666-.448-1.004 1.8.357 3.511.963 5.096 1.78A17.964 17.964 0 0 0 15 10c0-2.162-.381-4.235-1.08-6.155ZM15.243 3.097A19.456 19.456 0 0 1 16.5 10c0 2.43-.445 4.758-1.257 6.904l-.03.077a.75.75 0 0 0 1.401.537 20.903 20.903 0 0 0 1.312-5.745 2 2 0 0 0 0-3.546 20.902 20.902 0 0 0-1.312-5.745.75.75 0 0 0-1.4.537l.029.078Z" />
                      </svg>
                      <span class="translate-y-0.5">Talks</span>
                    </button>
                  </a>
                </HeadlessMenuItem>

                <HeadlessMenuItem v-slot="{ active }">
                  <a href="https://github.com/cmpadden">
                    <button
                      :class="[
                        active ? 'bg-orange-500/50 text-white' : 'text-white',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                    >
                      <svg
                        class="mr-2 inline h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"
                        ></path>
                      </svg>
                      <span class="translate-y-0.5">GitHub</span>
                    </button>
                  </a>
                </HeadlessMenuItem>

                <HeadlessMenuItem v-slot="{ active }">
                  <a href="https://bsky.app/profile/colton.boo">
                    <button
                      :class="[
                        active ? 'bg-orange-500/50 text-white' : 'text-white',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                    >
                      <svg
                        class="mr-2 inline h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 600 530"
                        fill="currentColor"
                      >
                        <path
                          d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"
                        />
                      </svg>
                      <span class="translate-y-0.5">Bluesky</span>
                    </button>
                  </a>
                </HeadlessMenuItem>
              </div>
            </HeadlessMenuItems>
          </transition>
        </HeadlessMenu>
      </div>
    </div>
  </nav>
</template>
