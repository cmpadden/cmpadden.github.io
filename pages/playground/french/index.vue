<template>
  <div class="font-mono h-screen flex">
    <div class="col-span-1 bg-orange-600 w-20">
      <div
        class="absolute bottom-10 w-20 left-0 transform -rotate-90 whitespace-nowrap"
      >
        <div class="text-4xl font-bold text-white">French Conjugations</div>
      </div>
    </div>
    <div class="col-span-9 bg-orange-100 p-8 w-full">
      <div class="flex p-4">
        <div
          class="flex-1 text-center text-gray-400 text-2xl"
          @click="decWordIndex"
        >
          {{ wordPrev || '-' }}
        </div>
        <div class="flex-1 text-center text-cyan-600 text-3xl font-bold">
          {{ word }}
        </div>
        <div
          class="flex-1 text-center text-gray-400 text-2xl"
          @click="incWordIndex"
        >
          {{ wordNext || '-' }}
        </div>
      </div>

      <div
        class="grid grid-cols-1 gap-8 xl:gap-12 md:grid-cols-3 xl:grid-cols-4"
      >
        <div v-for="(conjs, tense) in conjugations[word]" :key="tense">
          <div
            class="p-4 space-y-3 border-2 border-cyan-600 dark:border-cyan-300 rounded-md h-full shadow shadow-orange-500 bg-white"
          >
            <h1
              class="text-2xl font-semibold text-gray-700 capitalize dark:text-white"
            >
              {{ tense }}
            </h1>

            <div class="text-gray-500 dark:text-gray-300">
              <p v-for="c in conjs" :key="c">
                {{ c }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'light',
  data() {
    return {
      wordIndex: 0,
      conjugations: {
        // source: https://conjugator.reverso.net/index-french-1-250.html
        être: {
          Présent: [
            'je suis',
            'tu es',
            'il/elle est',
            'nous sommes',
            'vous êtes',
            'ils/elles sont',
          ],
          Imparfait: [
            "j'étais",
            'tu étais',
            'il/elle était',
            'nous étions',
            'vous étiez',
            'ils/elles étaient',
          ],

          Futur: [
            'je serai',
            'tu seras',
            'il/elle sera',
            'nous serons',
            'vous serez',
            'ils/elles seront',
          ],
          'Passé simple': [
            'je fus',
            'tu fus',
            'il/elle fut',
            'nous fûmes',
            'vous fûtes',
            'ils/elles furent',
          ],
          'Passé composé': [
            "j'ai été",
            'tu as été',
            'il/elle a été',
            'nous avons été',
            'vous avez été',
            'ils/elles ont été',
          ],
          'Plus-que-parfait': [
            "j'avais été",
            'tu avais été',
            'il/elle avait été',
            'nous avions été',
            'vous aviez été',
            'ils/elles avaient été',
          ],
        },
        avoir: {
          Présent: [
            "j'ai",
            'tu as',
            'il/elle a',
            'nous avons',
            'vous avez',
            'ils/elles ont',
          ],
          Imparfait: [
            "j'avais",
            'tu avais',
            'il/elle avait',
            'nous avions',
            'vous aviez',
            'ils/elles avaient',
          ],
          Futur: [
            "j'aurai",
            'tu auras',
            'il/elle aura',
            'nous aurons',
            'vous aurez',
            'ils/elles auront',
          ],
          'Passé simple': [
            "j'eus",
            'tu eus',
            'il/elle eut',
            'nous eûmes',
            'vous eûtes',
            'ils/elles eurent',
          ],
          'Passé composé': [
            "j'ai eu",
            'tu as eu',
            'il/elle a eu',
            'nous avons eu',
            'vous avez eu',
            'ils/elles ont eu',
          ],
          'Plus-que-parfait': [
            "j'avais eu",
            'tu avais eu',
            'il/elle avait eu',
            'nous avions eu',
            'vous aviez eu',
            'ils/elles avaient eu',
          ],
        },
        faire: {
          Présent: [
            'je fais',
            'tu fais',
            'il/elle fait',
            'nous faisons',
            'vous faites',
            'ils/elles font',
          ],
          Imparfait: [
            'je faisais',
            'tu faisais',
            'il/elle faisait',
            'nous faisions',
            'vous faisiez',
            'ils/elles faisaient',
          ],
          Futur: [
            'je ferai',
            'tu feras',
            'il/elle fera',
            'nous ferons',
            'vous ferez',
            'ils/elles feront',
          ],
          'Passé simple': [
            'je fis',
            'tu fis',
            'il/elle fit',
            'nous fîmes',
            'vous fîtes',
            'ils/elles firent',
          ],
          'Passé composé': [
            "j'ai fait",
            'tu as fait',
            'il/elle a fait',
            'nous avons fait',
            'vous avez fait',
            'ils/elles ont fait',
          ],
          'Plus-que-parfait': [
            "j'avais fait",
            'tu avais fait',
            'il/elle avait fait',
            'nous avions fait',
            'vous aviez fait',
            'ils/elles avaient fait',
          ],
        },
        voir: {
          Présent: [
            'je vois',
            'tu vois',
            'il/elle voit',
            'nous voyons',
            'vous voyez',
            'ils/elles voient',
          ],
          Imparfait: [
            'je voyais',
            'tu voyais',
            'il/elle voyait',
            'nous voyions',
            'vous voyiez',
            'ils/elles voyaient',
          ],
          Futur: [
            'je verrai',
            'tu verras',
            'il/elle verra',
            'nous verrons',
            'vous verrez',
            'ils/elles verront',
          ],
          'Passé simple': [
            'je vis',
            'tu vis',
            'il/elle vit',
            'nous vîmes',
            'vous vîtes',
            'ils/elles virent',
          ],
          'Passé composé': [
            "j'ai vu",
            'tu as vu',
            'il/elle a vu',
            'nous avons vu',
            'vous avez vu',
            'ils/elles ont vu',
          ],
          'Plus-que-parfait': [
            "j'avais vu",
            'tu avais vu',
            'il/elle avait vu',
            'nous avions vu',
            'vous aviez vu',
            'ils/elles avaient vu',
          ],
        },
        dire: {
          Présent: [
            'je dis',
            'tu dis',
            'il/elle dit',
            'nous disons',
            'vous dites',
            'ils/elles disent',
          ],
          Imparfait: [
            'je disais',
            'tu disais',
            'il/elle disait',
            'nous disions',
            'vous disiez',
            'ils/elles disaient',
          ],
          Futur: [
            'je dirai',
            'tu diras',
            'il/elle dira',
            'nous dirons',
            'vous direz',
            'ils/elles diront',
          ],
          'Passé simple': [
            'je dis',
            'tu dis',
            'il/elle dit',
            'nous dîmes',
            'vous dîtes',
            'ils/elles dirent',
          ],
          'Passé composé': [
            "j'ai dit",
            'tu as dit',
            'il/elle a dit',
            'nous avons dit',
            'vous avez dit',
            'ils/elles ont dit',
          ],
          'Plus-que-parfait': [
            "j'avais dit",
            'tu avais dit',
            'il/elle avait dit',
            'nous avions dit',
            'vous aviez dit',
            'ils/elles avaient dit',
          ],
        },
        prendre: {
          Présent: [
            'je prends',
            'tu prends',
            'il/elle prend',
            'nous prenons',
            'vous prenez',
            'ils/elles prennent',
          ],
          Imparfait: [
            'je prenais',
            'tu prenais',
            'il/elle prenait',
            'nous prenions',
            'vous preniez',
            'ils/elles prenaient',
          ],
          Futur: [
            'je prendrai',
            'tu prendras',
            'il/elle prendra',
            'nous prendrons',
            'vous prendrez',
            'ils/elles prendront',
          ],
          'Passé simple': [
            'je pris',
            'tu pris',
            'il/elle prit',
            'nous prîmes',
            'vous prîtes',
            'ils/elles prirent',
          ],
          'Passé composé': [
            "j'ai pris",
            'tu as pris',
            'il/elle a pris',
            'nous avons pris',
            'vous avez pris',
            'ils/elles ont pris',
          ],
          'Plus-que-parfait': [
            "j'avais pris",
            'tu avais pris',
            'il/elle avait pris',
            'nous avions pris',
            'vous aviez pris',
            'ils/elles avaient pris',
          ],
        },
        assurer: {
          Présent: [
            "j'assure",
            'tu assures',
            'il/elle assure',
            'nous assurons',
            'vous assurez',
            'ils/elles assurent',
          ],
          Imparfait: [
            "j'assurais",
            'tu assurais',
            'il/elle assurait',
            'nous assurions',
            'vous assuriez',
            'ils/elles assuraient',
          ],
          Futur: [
            "j'assurerai",
            'tu assureras',
            'il/elle assurera',
            'nous assurerons',
            'vous assurerez',
            'ils/elles assureront',
          ],
          'Passé simple': [
            "j'assurai",
            'tu assuras',
            'il/elle assura',
            'nous assurâmes',
            'vous assurâtes',
            'ils/elles assurèrent',
          ],
          'Passé composé': [
            "j'ai assuré",
            'tu as assuré',
            'il/elle a assuré',
            'nous avons assuré',
            'vous avez assuré',
            'ils/elles ont assuré',
          ],
          'Plus-que-parfait': [
            "j'avais assuré",
            'tu avais assuré',
            'il/elle avait assuré',
            'nous avions assuré',
            'vous aviez assuré',
            'ils/elles avaient assuré',
          ],
        },
        obtenir: {
          Présent: [
            "j'obtiens",
            'tu obtiens',
            'il/elle obtient',
            'nous obtenons',
            'vous obtenez',
            'ils/elles obtiennent',
          ],
          Imparfait: [
            "j'obtenais",
            'tu obtenais',
            'il/elle obtenait',
            'nous obtenions',
            'vous obteniez',
            'ils/elles obtenaient',
          ],
          Futur: [
            "j'obtiendrai",
            'tu obtiendras',
            'il/elle obtiendra',
            'nous obtiendrons',
            'vous obtiendrez',
            'ils/elles obtiendront',
          ],
          'Passé simple': [
            "j'obtins",
            'tu obtins',
            'il/elle obtint',
            'nous obtînmes',
            'vous obtîntes',
            'ils/elles obtinrent',
          ],
          'Passé composé': [
            "j'ai obtenu",
            'tu as obtenu',
            'il/elle a obtenu',
            'nous avons obtenu',
            'vous avez obtenu',
            'ils/elles ont obtenu',
          ],
          'Plus-que-parfait': [
            "j'avais obtenu",
            'tu avais obtenu',
            'il/elle avait obtenu',
            'nous avions obtenu',
            'vous aviez obtenu',
            'ils/elles avaient obtenu',
          ],
        },
        utiliser: {
          Présent: [
            "j'utilise",
            'tu utilises',
            'il/elle utilise',
            'nous utilisons',
            'vous utilisez',
            'ils/elles utilisent',
          ],
          Imparfait: [
            "j'utilisais",
            'tu utilisais',
            'il/elle utilisait',
            'nous utilisions',
            'vous utilisiez',
            'ils/elles utilisaient',
          ],
          Futur: [
            "j'utiliserai",
            'tu utiliseras',
            'il/elle utilisera',
            'nous utiliserons',
            'vous utiliserez',
            'ils/elles utiliseront',
          ],
          'Passé simple': [
            "j'utilisai",
            'tu utilisas',
            'il/elle utilisa',
            'nous utilisâmes',
            'vous utilisâtes',
            'ils/elles utilisèrent',
          ],
          'Passé composé': [
            "j'ai utilisé",
            'tu as utilisé',
            'il/elle a utilisé',
            'nous avons utilisé',
            'vous avez utilisé',
            'ils/elles ont utilisé',
          ],
          'Plus-que-parfait': [
            "j'avais utilisé",
            'tu avais utilisé',
            'il/elle avait utilisé',
            'nous avions utilisé',
            'vous aviez utilisé',
            'ils/elles avaient utilisé',
          ],
        },
      },
    }
  },
  computed: {
    words(): string[] {
      return Object.keys(this.conjugations)
    },
    word(): string {
      return this.words[this.wordIndex]
    },
    wordPrev(): string | undefined {
      if (this.wordIndex === 0) {
        return undefined
      } else {
        return this.words[this.wordIndex - 1]
      }
    },
    wordNext(): string | undefined {
      if (this.wordIndex + 1 === this.words.length) {
        return undefined
      } else {
        return this.words[this.wordIndex + 1]
      }
    },
  },
  methods: {
    incWordIndex() {
      if (this.wordIndex < this.words.length - 1) {
        this.wordIndex += 1
      }
    },
    decWordIndex() {
      if (this.wordIndex > 0) {
        this.wordIndex -= 1
      }
    },
  },
})
</script>
