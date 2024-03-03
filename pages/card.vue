<script setup>
definePageMeta({ layout: "empty" });

const visible = ref(false);
const index1 = ref(0);
const index2 = ref(0);

const modulus_value = (list, index) => {
  return list[index % list.length];
};

onMounted(() => {
  setInterval(function () {
    // alternate incrementing indexes
    if (index1.value > index2.value) {
      index2.value += 1;
    } else {
      index1.value += 1;
    }
  }, 1500);
});

const title = "TL;DR";

// list of 25 interesting hobbies for the adrenaline junky
const hobbies = [
  "Skydiving",
  "Bungee jumping",
  "Rock climbing",
  "White water rafting",
  "Paragliding",
  "Scuba diving",
  "Base jumping",
  "Mountain biking",
  "Surfing",
  "Snowboarding",
  "Wakeboarding",
  "Motorsports",
  "Parkour",
  "Zip-lining",
  "Off-roading",
  "Cave diving",
  "Kiteboarding",
  "Hang gliding",
  "Free solo climbing",
  "Bull riding",
  "Ice climbing",
  "Wing suit flying",
  "Extreme skiing",
  "Cliff jumping",
  "Cave exploring",
];

// list of 25 professions for the most interesting man in the world
const professions = [
  "Astronaut",
  "Archaeologist",
  "Professional athlete",
  "Chef",
  "Fashion designer",
  "Film director",
  "Investigative journalist",
  "Marine biologist",
  "Musician",
  "Photographer",
  "Pilot",
  "Professional gamer",
  "Professor",
  "Sculptor",
  "Spy",
  "Stand-up comedian",
  "Surfing instructor",
  "Travel writer",
  "Wildlife photographer",
  "Wine connoisseur",
  "Yacht captain",
  "Yoga instructor",
  "Zookeeper",
  "Adventure tour guide",
  "Art curator",
];
</script>

<template>
  <div
    v-if="visible"
    class="absolute bottom-2 right-2 h-24 w-24"
    :class="dynamic_bg"
  >
    <qr />
  </div>
  <main class="bg-slate-800">
    <div class="flex h-screen items-center justify-center">
      <div
        id="_card"
        @click="visible = !visible"
        class="md:w-512px w-[350px] border border-white bg-black p-4 font-mono uppercase text-white shadow-xl shadow-yellow-950 transition-all hover:scale-102 hover:cursor-pointer"
      >
        <div class="mb-2 font-extrabold tracking-wide">{{ title }}</div>
        <div class="mb-4 space-y-2 text-sm">
          <!-- name -->
          <div class="flex items-center">
            <div class="flex-none pr-2">Name</div>
            <div class="flex-grow border-b border-dotted"></div>
            <div class="flex-none pl-2">Colton</div>
          </div>
          <!-- profession -->
          <div class="flex items-center">
            <div class="flex-none pr-2">Profession</div>
            <div class="flex-grow border-b border-dotted"></div>
            <div class="flex-none pl-2">
              {{ modulus_value(professions, index1) }}
            </div>
          </div>
          <!-- hobbies -->
          <div class="flex items-center">
            <div class="flex-none pr-2">Hobby</div>
            <div class="flex-grow border-b border-dotted"></div>
            <div class="flex-none pl-2">
              {{ modulus_value(hobbies, index2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
