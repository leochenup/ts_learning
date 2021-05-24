import './function.ts'
import './class.ts'
import './decorator.ts'
import './abstract'
import './interface'
import './generic'
import './structureCheck'


namespace a {
    let num: string | number
    let str: string = 'hello'
    num = 'a'
    str = num


}

/**
 * 类的兼容
 */
namespace b {
    class Animal {
        name: string
    }
    class Bird extends Animal {
        fly(): void {

        }
    }

    let b: Animal;
    b = new Bird() //子类赋值给父类
}

/**
 * 函数兼容性
 */
namespace c {
    type sumFn = (a: number, b: number) => number
    let sum: sumFn
    let f1 = (a: number) => {
        return a
    }
    // sum = f1 //参数个数只能少不能多



    //比较返回值
    type GetPerson = () => {
        name: string,
        age: number

    }
    let getPerson: GetPerson
    getPerson = () => {
        return {
            name: 'sd',
            age: 12
        }
    }
    getPerson = () => {
        return {
            // 返回值不能少于类型的约束
            name: 's',
            age: 12
        }
    }
    getPerson = () => {
        return {
            // 返回值不能少于类型的约束
            //但是可以多
            name: 's',
            age: 12,
            gender: 0
        }
    }
}

/**
 * 函数参数协变
 * strictFunctionTypes 默认为 true （启用函数协变）
 */
namespace d {
    type logFn = (a: number | string) => void

    let log: logFn
    function log1(a: number | string | boolean) {
        console.log(a)
    }
    log = log1 //参数不同 log1 必须至少满足 logFn 的约束
}

/**
 * 泛型的兼容性
 *   泛型在判断兼容性的时候会先判断具体的类型，
 *   然后在进行兼容性判断
 */
namespace e {
    interface Empty<T> {
        data: T
    }

    let x!: Empty<string>
    let y!: Empty<number>
    // x = y 报错 类型不符 


    interface NotEmptyString<T> {
        data: string
    }
    interface NotEmptyNumber<T> {
        data: number
    }

    /**
     * 枚举兼容性
     */

    enum Colors {
        RED, YELLOW
    }
    let c: Colors
    c = Colors.RED
    c = 1 //兼容数字
    let d: number
    d = Colors.YELLOW

}


/**
 * 类型保护
 * 类型保护 更精确只知道是哪种类型，保证不会调用其不存在的属性或方法
 */
namespace f {
    console.clear()
    function fn(a: number | string | boolean) {
        if (typeof a === "number") {
            console.log(a.toFixed(2))
        } else if (typeof a === "string") {
            console.log(a.length)
        } else {
            console.log(a)
        }
    }
    fn('leo')


    class Animal {
        public name: string
    }

    class Bird extends Animal {
        public fly(): void { }
    }

    function Test(a: Animal) {
        if (a instanceof Bird) { //类型保护
            a.fly()
        } else {
            console.log(a.name)
        }
    }

    Test(new Animal())
    Test(new Bird())


    /// null 保护
    function f(a: string | null) {
        // return a.charAt(0) //报错
    }
    function f2(a: string | null) {
        // return a!.charAt(0) // 非空断言 !
        return a?.charAt(0) // 非空断言 ?
    }




    interface B1 {
        class_: "B1 button"
        text1: "B1"
    }
    interface B2 {
        class_: "B2 button"
        text2: "B2"
    }
    type Button = B1 | B2
    function test2(a: Button) {
        if ("text1" in a) {//类型保护
            console.log(a.text1)
        } else {
            console.log(a.text2)
        }
    }

    function test3(a: Button) {
        if (a.class_ == "B1 button") { //类型保护
            console.log(a.text1)
        } else {
            console.log(a.text2)
        }
    }
}

/**
 * 自定义类型保护
 */
namespace g {
    console.clear()
    interface Bird {
        legs: number
        name1: 'bird'
    }
    interface Dog {
        legs: number
        name1: 'dog'
    }

    type Anuimal = Bird | Dog
    function isBird(a: Anuimal): a is Bird {
        return a.legs === 2
    }

    let bird1: Bird = {
        legs: 2,
        name1: 'bird'
    }
    function test(a: Anuimal) {
        if (isBird(a)) {
            console.log("我是鸟")
        } else {
            console.log(a.legs)
        }
    }
    test(bird1)
}

/**
 * 交叉类型
 */
namespace h {
    interface Bird {
        name: string
        fly(): void
    }
    interface Person {
        name: string
        study(): void
    }

    type BirdMan = Bird & Person
    let bd: BirdMan = {
        name: 'leo',
        fly() { },
        study() { }
    }


}

namespace g {
    // typeof 可以获取变量的类型
    let p = {
        number: 'leo',
        age: 10
    }

    type Person = typeof p  // typeof 获取 p 的类型
    let p2: Person = {
        number: 'leo1',
        age: 112
    }

}

/**
 * 索引访问操作符（[]）
 */
namespace i {
    interface Person {
        name: string,
        age: number,
        job: { name: string },
        hobits: { name: string, level: number }[]
    }

    //  拿到子类型 Person['job']['name']
    let myName: Person['job']['name'] = 'forntEnd'
}

/**
 * keyof 索引类型查询
 */
namespace j {
    console.clear()
    interface Person {
        name: string,
        age: number,
        gender: 0 | 1
    }

    // key: keyof Person 代表它的值为只能取 Person 的 Key 值之一
    function getValue(val: Person, key: keyof Person): any {
        return val[key]
    }
    let p: Person = {
        name: 'leo',
        age: 12,
        gender: 0
    }
    console.log(getValue(p, 'name'))
}

/**
 * 映射类型 （in）
 */
namespace m {
    console.clear()
    interface Person {
        name: string,
        age: number,
        gender: 0 | 1
    }
    type PartialPerson = {
        // key in keyof Person 迭代循环的得到 Person 的 key 值
        [key in keyof Person]?: Person[key]
    }

    let pp: PartialPerson = {
        name: 'leo'
    }
}

/**
 * 内置方法 
 *    Partial
 *    Required
 *    ReadOnly
 *    Pick
 */
namespace n {
    console.clear()
    interface Person {
        name: string,
        age: number,
        gender: 0 | 1
    }
    //属性变为可选
    type PartialPerson = Partial<Person>
    //实现如下
    type Partial<T> = {
        [key in keyof T]?: T[key]
    }

    //属性变为 必有
    type RequieredPerson = Required<Person>
    //实现如下
    type Required<T> = {
        [key in keyof T]-?: T[key]
    }


    //只读属性
    type ReadOnlyPerson = Readonly<Person>
    //实现
    type Readonly<T> = {
        readonly [key in keyof T]: T[key]
    }

    //获取某一项的类型
    type PickName = Pick<Person, 'name'>
    let x: PickName = {
        name: 'leo111'
    }
    //实现Pick
    type Pick<T, K extends keyof T> = {
        [key in K]: T[key]
    }
    type Pickage = Pick<Person, 'age'>
    let a: Pickage = {
        age: 1
    }

    //从前者中排除后者类型 Exclude
    type E = Exclude<string | number, string>
    let e: E = 10
    //从前者中提取后者类型 Extract
    type E2 = Extract<string | number | null, string>
    let e2: E2 = "loe"
    //干掉为空的 NoNullable
    type E3 = NonNullable<string | undefined | null | number>
    let e3: E3 = 12
    e3 = '21'

    // ReturnType
    function getUseInfo() {
        return {
            name: 'leo',
            age: 10
        }
    }
    //ReturnType 获取函数的返回值类型
    type UserInfo = ReturnType<typeof getUseInfo>
    let user: UserInfo = {
        name: 'll',
        age: 11
    }


    //获取构造函数实例的类型
    class Person {
        name: string
        constructor(name: string) {
            this.name = name
        }
    }
    //获取构造函数实例的类型
    type P = InstanceType<typeof Person>
    let p: P = new Person("leo")
}
/**
    * interface 是定义接口类型 是真正的类型，可能会被导出导入
    * type 只是类型的临时别名，不会产出真正的类型
    * class 定义类
    */

/**
 * 泛型条件判断
 * 三目运算符
 */
namespace o {
    interface Fish {
        name1: 'fish'
    }
    interface Bird {
        name2: 'bird'
    }
    interface Water {
        name3: 'water'
    }
    interface Sky {
        name4: 'sky'
    }
    type Condition<T> = T extends Fish ? Water : Sky
    let c: Condition<Fish> = {
        name3: 'water'
    }
    let d: Condition<Bird> = {
        name4: 'sky'
    }



    //条件类型的分发
    type Condition2<T> = T extends Fish ? Water : Sky
    let c1: Condition2<Bird | Fish> = {
        //得到的类型 Water 或者 Sky
        //因此 可以获取  name3: "water", name4: 'sky'
        name3: "water",
        name4: 'sky'
    }
}



/**
 * 模块 命名空间
 * namespace ：
 *   1.封装类似的代码
 *   2.防止命名冲突
 *
 * module:
 *   1.明确的功能区分
 *   2.代码复用
 *
 */




/**
 * 类型声明
 * 申明文件可以让我们不需要将js重构为ts，只需要加上声明文件就可以使用
 * 类型声明在编译时会被删除，不会影响真正的代码
 */

import './declareTypes'