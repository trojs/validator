import Test2 from './test2.js'
import Test3Schema from './test3.js'

export default {
  name: String,
  test: Test2,
  'test3?': Test3Schema,
  'test4?': 'mixed',
  'test5?': 'function|async',
  'test6?': 'object|string'
}
