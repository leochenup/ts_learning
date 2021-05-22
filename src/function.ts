/*
 * 函数重载 
*/
function sum(a: string, b: string): string;
function sum(a: number, b: number): number;
function sum(a: any, b: any): any {
    if (typeof a === 'number') {
        return a + b
    } else if (typeof b === 'string') {
        return b + a
    }
}

console.log(sum(1, 2))