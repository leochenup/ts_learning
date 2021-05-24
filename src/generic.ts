import { clear } from './utile'
/**
 * 泛型 
 * 定义函数 类 方法 使用 泛型
 */
namespace a {
    clear()
    function createArray<T>(length: number, value: T): Array<T> {
        let res: Array<T> = []
        for (let i = 0; i < length; i++) {
            res.push(value)

        }
        return res
    }

    let res = createArray(5, true)
    console.log(res)
}

/**
 * 类数组 IArguments
 */
type IArguments = {
    [index: number]: any
    length: number
    callee: Function
}
namespace b {
    clear()
    function sum(...args1: any[]) {
        let args: IArguments = arguments
        for (let i = 0; i < args.length; i++) {
            console.log(args[i])
        }
    }
    sum(1, 2, 3)
}

/**
 * 泛型类
 */
namespace c {
    clear()
    class MyArray<T> {
        private list: T[] = []
        add(val: T) {
            this.list.push(val)
        }
        get(index: number): T {
            return this.list[index]
        }
        getMax(): T {
            let max = this.list[0]
            this.list.forEach((item) => {
                if (item > max) {
                    max = item
                }
            })
            return max
        }
    }

    let list = new MyArray<number>()
    list.add(1)
    list.add(3100)
    list.add(99999)
    list.add(6)
    console.log(list.getMax())
}

/**
 * 接口泛型
 * */
namespace d {
    clear()
    interface Caculator1 {
        <T>(a: T, b: T): T //接口泛型 //T作用于当前函数
    }
    interface Caculator2<T> {//T作用于整个接口
        (a: T, b: T): T //接口泛型
    }
    let add1: Caculator1 = <T>(a, b) => a + b// 接口约束函数使用泛型
    let add2: Caculator2<number> = (a, b) => a + b// 接口约束函数使用泛型

    console.log(add1(1, 2))
    console.log(add2(1, 2))
}


/**
 * 多个类型参数
 */
namespace e {
    clear()
    let a = 1
    let b = 2
    a = [b, b = a][0] //方法一：交换两个值！！！！！！
    console.log(a, b)

    function swap<A, B>(t: [A, B]): [B, A] { //方法二：交换两个值
        return [t[1], t[0]]
    }
    console.log(swap([a, b]))
}
/**
 * 默认泛型
 */

namespace f {
    clear()
    // <T = number> 默认泛型 number
    function test<T = number>(length: number, b?: T): T[] {
        let res = []
        for (let i = 0; i < length; i++) {
            if (!b) {
                res.push(0)
            } else {
                res.push(b)
            }

        }
        return res
    }
    let res = test(10) //第二个参数不传的时候 T 会，默认 number 类型
    console.log(res)
}
/**
 * 
 * 函数中使用泛型时由于不知道其类型 所以不能访问其属性
 * 
 * 约束泛型
 */
namespace e {
    clear()
    interface Restrain {
        name: string
        age: number
    }
    function logger<T extends Restrain>(a: T): void {
        // console.log(a.name) //报错
        console.log(a.name)
    }

    logger({ name: 'leo', age: 12 })
}

/**
 * 泛型接口
 * 类型别名
 */
namespace f {
    interface Cart<T> {
        list: T[]
    }
    let cart: Cart<string> = {
        list: ["leo", "23"],
    }

    interface Temp {
        length: number
    }
    type C<T extends Temp> = { name: T }
    let c: C<string[]> = {
        name: ['12']
    }
}


