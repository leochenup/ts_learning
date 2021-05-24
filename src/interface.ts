/**
 * 注意：class 的 super 有两种指向，在静态方法和构造函数中 super指向父类，
 *      在普通函数中指向父类的prototype 
 */


import { clear } from './utile'
clear()
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

/**
 * 任意属性
 * [p: string]: any
 * 随便什么属性都行
 */

namespace b {
    clear()
    interface Test {
        [p: string]: number
    }

    let obj: Test = {
        x: 1, y: 2, z: 3,
    }
}

/**
 * 接口继承
 * 实现接口的类必须把接口父类中的抽象方法也实现
 */
namespace c {
    interface Speakable {
        speak(): void
    }
    interface SpeakChinese extends Speakable {
        speakChinses(): void
    }

    class Person implements SpeakChinese {
        speakChinses() {

        }
        speak() {

        }
    }
}

/**
 * 接口 readOnly
 */

namespace d {
    interface Cricle {
        readonly PI: number
        raduis: number
    }

    let c: Cricle = {
        PI: 3.14, // 不可改变
        raduis: 10
    }

}


/**
 * 接口约束函数
 * 
 */
namespace e {
    interface Fn {
        (a: number): number // 约束函数
    }
    let fn: Fn = (a: number): number => {
        return a
    }
}


/**
 * 可索引接口
 * 对数组和对象进行约束
 */
namespace f {
    clear()
    interface Users {
        [i: number]: string
    }
    let users: Users = ["leo", "tom"] //约束数组

    let obj: Users = {
        0: 'tom',
        1: "jack"
    }

    console.log(obj, users)
}

/**
 * 类接口
 * 用来约束类 
 */
namespace g {
    clear()
    interface Speakable {
        name: string
        speak(words: string): void
    }

    //约束类不带构造函数
    class Dog implements Speakable {
        name: string = 'leo'
        speak() {

        }
    }

    class Animal {
        constructor(public name: string) {
            this.name = name
        }
    }

    //约束带构造函数的类 用来约束类 (实质是约束构造函数)
    interface WithName {
        new(name: string): Animal
    }
    //约束带构造函数的类，传入的_class是 <T extends WithName> 类型,_class 的构造函数必须满足 WithName接口规范
    function createAnimal<T extends WithName>(_class: T, name: string): any {
        return new _class(name)
    }
    let a = createAnimal(Animal, "dog1")
    console.log(a)
}
