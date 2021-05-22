import { clear } from './utile'
// clear()
/**
 * 接口
 * 接口里面只能放方法的定义，不能实现（都是抽象方法）
 * 
 * 1.接口一方面可以在面向对象编程中表示 ‘行为的抽象’ ，
 *   另外可以用来描述随想的形状。
 * 2.接口就是把一些类中共有的属性和方法抽象出来，
 *   可以用来约束实现此接口的类
 * 3.一个类可以继承另一个类并实现多个接口
 * 4.接口像插件一样是用来增强类的，而抽象类是具体一些类的抽象概念
 * 5.一个类可以实现多个接口，一个接口也可以被多个类实现，
 *       类只能有一个父类，但可以有多个子类
 */

namespace a {
    interface Point {
        x: number
        y: number
    }
    //1.描述对象现状
    let obj: Point = {
        x: 12,
        y: 13
    }

    interface Speakable {
        speak(): void,
    }

    interface Eatable {
        eat(): void
    }

    //实现多个接口 接口提供不同的能力
    class Student implements Speakable, Eatable {
        speak() {
            console.log("speak")
        }
        eat() {
            console.log("eat")

        }
    }

    let std = new Student()
    std.speak()
    std.eat()
}