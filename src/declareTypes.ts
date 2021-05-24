export { }
declare const $: (selector: string) => {
    width: (args: number) => {}
    json: () => {}
}
$("#root").width(100)

declare let name: string
declare let age: number
declare function getName(): string
declare class Animal { name: string }

type Student = Animal | string

declare enum Season {
    Spring,
    Summer,
    Winter,
    Autunm
}