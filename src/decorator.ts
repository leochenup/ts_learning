import { clear, consoleS, console_ } from './utile'
clear()
/**
 * 类装饰器
 * 增强类（类是别人写的自己不能改动，只有通过装饰器来为为类添加新特性）
 * 装饰器就是一个函数
 */

namespace a {

    interface Person {
        xx: string,
        yy: string
    }
    //给类添加属性或者方法
    function enhancer(target: any) {
        target.prototype.xx = "xx"
        target.prototype.yy = "yy"
    }

    @enhancer
    class Person {
        constructor() { }
    }

    let p = new Person()
    console.log(p.xx)
}


namespace b {
    interface Person {
        age: number,
    }

    function enhancer(name: string) {
        return (target: any) => {
            return class Child extends target { //返回新的类 会替换掉老的类
                public name: string = name
                public age: number = 10
                public say() {
                    console.log("say")
                }
            }
        }
    }


    @enhancer("leo11")
    class Person {
        public name: string = "leo"
        constructor() { }
    }

    let p = new Person()
    console.log(p) //替换了新的类的实例
}

/**
 * 属性装饰器 / 方法装饰器
 * 属性装饰器用来装饰属性
 * 第一个参数：对于静态成员来说是类的构造函数，对于实例成员是原型对象、
 * 第二个参数：属性名称
 * 
 * 方法装饰器用来装饰方法
 * 第一个参数：对于静态成员来说是类的构造函数，对于实例成员是原型对象
 * 第二个参数：方法名称
 * 第三个参数：方法描述符
 */
namespace c {
    //属性装饰器 把赋的值改为大写
    function upperCase(target: any, properName: string) {
        let value = target[properName]
        const getter = () => value
        const setter = (newValue: string) => { value = newValue.toUpperCase() }
        Object.defineProperty(target, properName, {
            get: getter,
            set: setter,
            configurable: true,
            enumerable: true,

        })
    }

    //方法装饰器 根据参数 让属性变成可枚举和不可枚举
    function methodEnumerable(isEnumerable: boolean) {
        return function (target: any, properName: string, propertyDescriptor) {
            propertyDescriptor.enumerable = isEnumerable
            Object.defineProperty(target, properName, propertyDescriptor)
        }
    }

    //属性装饰器根据参数 让属性变成可枚举和不可枚举
    function propertyEnumerable(isEnumerable: boolean) {
        return function (target: any, properName: string) {
            Object.defineProperty(target, properName, {
                enumerable: isEnumerable
            })
        }
    }

    //装饰静态方法 target 为类
    function staticDecorator(target, properName, properDDecriptor) {
        consoleS('装饰静态方法 ', "staticDecorator:", target, properDDecriptor)
    }


    //装饰函数 把函数的参数改为number 类型
    // 思路：用新方法 替换老方法，在新方法中执行老方法，把新方法的参数转成 int 类型
    // 这样老方法接收的参数也就是int 类型了
    function toNumber(target, propName, propertyDescriptor) {
        // propertyDescriptor.value 为被装饰的函数

        let oldMeythod = propertyDescriptor.value
        let newMethod = function (...args) {
            args = args.map((item) => parseInt(item))
            return oldMeythod(...args)
        }
        propertyDescriptor.value = newMethod
    }

    class Person {
        //越靠经属性越先执行
        @propertyEnumerable(true) //枚举设置装饰器
        @upperCase //属性赋值之前执行 
        name: string = 'tom'
        @methodEnumerable(true)
        getName() {
            console.log(this.name)
        }
        @staticDecorator //静态方法装饰器
        static sayCount() {
            console.log('count')
        }

        @toNumber
        sum(...args: any[]) {
            return args.reduce((a, b) => a + b, 0)
        }
    }
    let p = new Person()
    consoleS("sum方法的结果：", p.sum('1', 2, '3', '4', '5'))
}


/**
 * 参数装饰器 （很少用）
 * 参数一：对于静态成员来说是类的构造函数，对于实例成员是原型对象
 * 参数二：所装饰方法的名称
 * 参数三：参数位置的索引
 */
namespace d {
    interface Person {
        age: number
    }
    //参数装饰器 添加一个Age属性
    function addAge(target: any, methodName: string, paramsIdx: number) {
        console.log(target, methodName, paramsIdx)
        target.age = 10
    }
    class Person {
        login(username: string, @addAge password: string) {
            consoleS('参数装饰器', this.age)
        }
    }

    let p = new Person()
    p.login("leo", '9090980')
}



/**
 * 装饰器顺序
 * 【属性 => （参数 =>方法）{这两个顺序谁写在前，谁先执行}】 =>类
 *
 * 离被修饰的对象越近越先执行
 */