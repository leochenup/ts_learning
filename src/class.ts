/**
 * 类
 */


/**
 * 两种初始化方式
 * 1.constructor 中初始化
 * 2.直接初始化
 * 3.直接定义再初始化 （public）
 */
namespace a {

    class Person {
        name: string = "q" // 直接初始化
        age: number
        constructor(age: number) {
            this.age = age // constructor 中初始化
        }
    }

    class Person1 {
        constructor(public age: number) { // 直接定义
        }
    }

}


/**
 * 存取器
 */
namespace b {
    class Person {
        myName: string
        constructor(name: string) {
            this.myName = name
        }

        set name(name: string) {
            console.log("set name")
            this.myName = name
        }

        get name() {
            console.log("get name")
            return this.myName
        }
    }
    let p = new Person("leo",)
    p.name = "leo"
    console.log(p.name)
}


/**
 * readOnly
 * 只读属性，加在变量前面
 */
namespace c {
    class Person {
        readonly name: string = 'leo'
        constructor(public readonly age: number) {

        }
    }
}


/**
 * 继承
 * 访问控制符 public（所有访问） protected（自己及子类访问，外部不能访问） private（仅自己访问）
 * 注意: 修改 ts.config.js 中的 strictPropertyInitialization 字段为 false
 * 表示定义类的属性时可以不用初始化值
 * strictPropertyInitialization: Enable strict checking of property initialization in classes. 
 */
namespace d {
    console.log("---------------------继承-----------------------")
    class Person {
        public name: string
        constructor(name: string) {
            this.name = name
        }
        run() {
            console.log("Person run")
        }
        speak() {
            console.log("Person speak")
        }
    }

    class Student extends Person {
        constructor(name: string) {
            super(name)
        }
        study() {
            console.log("student study")
        }
        run() {
            super.run()
            console.log("student run")
        }
    }


    let s = new Student("leo")
    console.log(s.name)
    s.run()
    s.speak()
    s.study()
    console.log("---------------------继承-----------------------")
}

/**
 * 静态属性、静态方法
 * 1.静态方法中的 this 为该类
 * 2.非静态方法 可以通过 “类名.属性” 来获取静态属性
 * 3.
 */
namespace e {
    console.log("---------------------静态属性、静态方法-----------------------")
    class Person {
        static count: number = 0
        public speak() {
            console.log(Person.count)
        }
        static speak() {
            console.log(this) // 静态方法中的 this 为该类
        }
    }

    let p = new Person()
    p.speak()
    Person.speak()
    console.log("---------------------静态属性、静态方法-----------------------")
}

/**
 * 装饰器
 */
namespace f{
    
}