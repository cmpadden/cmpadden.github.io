import p5 from 'p5'

export default ({ _app }, inject) => {
  inject('p5', p5)
  inject('hello', () => console.log('Hi!'))
}
