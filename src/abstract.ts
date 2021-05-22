import { clear, consoleS } from './utile'
clear()

/**
 * 抽象类
 * 
 * 接口像插件一样是用来增强类的，而抽象类是具体一些类的抽象概念
 * 一个类可以实现多个接口，一个接口也可以被多个类实现，
 *     类只能有一个父类，但可以有多个子类
 */
namespace a {
    abstract class Person {
        name: string
        constructor(name: string) { this.name = name }
        abstract speak(): void;
        abstract run(): void
        abstract getName(): string
    }

    class Student extends Person {
        constructor(name: string) {
            super(name)
        }
        speak() {
            console.log(this.name + " speak")
        }
        run() {
            console.log(this.name + ' run')
        }
        getName() {
            return this.name
        }
    }

    let std = new Student("Leo")
    std.speak()
    std.run()
    console.log(std.name)
}