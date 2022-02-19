<template>
  <div class="select-none bg-gradient-to-b from-green-800 to-gray-800">
    <div class="h-screen grid place-items-center">
      <div class="font-mono text-white">
        <div class="mb-2 border-2 border-white">
          <div id="canvas" />
        </div>
        <div class="w-48 my-2 text-center md:w-full">
          m-ary tree based tiling
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

const PALETTE = [
  '#FFBA08',
  '#FAA307',
  '#F48C06',
  '#E85D04',
  '#DC2F02',
  '#D00000',
  '#9D0208',
  '#6A040F',
  '#370617',
  '#03071E',
]

// tree structure to render tiles
class Node {
  constructor() {
    this.parent = undefined
    this.children = []
    this.orientation = 'h'
    this.x = 0
    this.y = 0
    this.w = 500
    this.h = 500
  }

  add(node) {
    node.parent = this
    this.children.push(node)

    // set dimensions of child node, adjusting companion children
    this.children.forEach((n, ix) => {
      if (this.orientation === 'h') {
        const cw = this.w / this.children.length
        const cx = this.x + cw * ix
        n.x = cx
        n.y = this.y
        n.w = cw
        n.h = this.h
      } else if (this.orientation === 'v') {
        const ch = this.h / this.children.length
        const cy = this.y + ch * ix
        n.x = this.x
        n.y = cy
        n.w = this.w
        n.h = ch
      }
    })
  }

  render(sketch) {
    // render current node
    sketch.rect(this.x, this.y, this.w, this.h)
    // render children nodes
    this.children.forEach((n, ix) => {
      sketch.fill(PALETTE[ix % 9])
      n.render(sketch)
    })
  }

  traverseForPoint(x, y) {
    // find the smallest possible child node that contains coordinates `x` and `y`
    if (this.children.length === 0) {
      return this
    } else {
      for (let i = 0; i < this.children.length; i++) {
        const c = this.children[i]
        if (x >= c.x && x <= c.x + c.w) {
          if (y >= c.y && y <= c.y + c.h) {
            // this logic feels wonky, and needs to be cleaned up
            if (c.children.length === 0) {
              return c
            } else {
              return c.traverseForPoint(x, y)
            }
          }
        }
      }
    }
  }
}

export default Vue.extend({
  layout: 'light',
  data() {
    return {}
  },
  mounted() {
    const sketch = (s) => {
      const HEIGHT = 500
      const WIDTH = 500

      // root w/ children
      const root = new Node()

      // add 5 children to the root node
      for (let i = 0; i < 5; i++) {
        root.add(new Node())
      }

      root.children[0].orientation = 'v'
      for (let i = 0; i < 3; i++) {
        root.children[0].add(new Node())
      }

      root.children[0].children[2].orientation = 'v'
      for (let i = 0; i < 4; i++) {
        root.children[0].children[2].add(new Node())
      }

      root.children[1].orientation = 'v'
      for (let i = 0; i < 3; i++) {
        root.children[1].add(new Node())
      }

      for (let i = 0; i < 9; i++) {
        root.children[1].children[0].add(new Node())
      }

      root.children[3].orientation = 'v'
      for (let i = 0; i < 3; i++) {
        root.children[3].add(new Node())
      }

      root.children[3].children[2].orientation = 'v'
      for (let i = 0; i < 9; i++) {
        root.children[3].children[2].add(new Node())
      }

      s.setup = () => {
        s.createCanvas(WIDTH, HEIGHT)
        s.noLoop()

        s.stroke(255)
        s.strokeWeight(2)

        root.render(s)
      }

      s.mouseClicked = () => {
        // find smallest node containing mouse coordinates
        const node = root.traverseForPoint(s.mouseX, s.mouseY)
        if (node) {
          // this doesn't allow one to add nodes to the parent, which is likely a better idea

          // add two children nodes to create a split
          node.add(new Node())
          node.add(new Node())
          // only render the node taht is being updated
          node.render(s)
        }
      }
    }

    // eslint-disable-next-line no-new
    new this.$p5(sketch, 'canvas')
  },
})
</script>


