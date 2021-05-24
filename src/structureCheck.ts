import { runtime } from '../node_modules/webpack/types'
import { clear } from './utile'
/**
 * 接口兼容性
 * Duck check
 */
namespace a {
    clear()
    interface Creature {
        name: string
        age: number
    }
    interface Person {
        name: string
        age: number
        speak: (words: string) => void
        run(): void
    }

    function test(obj: Creature) {
        console.log("我是", obj.name, "今年", obj.age, "岁")
    }
    let person: Person = {
        name: 'leo',
        age: 12,
        speak() {
            console.log("person speak")
        },
        run() {
            console.log("person run")
        }
    }
    let dog: Creature = {
        name: '拉布拉多',
        age: 2,
    }
    test(person)
    test(dog)

}