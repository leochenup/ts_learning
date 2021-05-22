function clear() {
    console.clear()
}

function consoleS(tag, ...args) {
    console_(tag, "开始")
    console.log("\n\n", ...args, "\n\n")
    console_(tag, "结束")
    console.log("\n\n\n\n\n")
}

function console_(str, str2) {
    console.log(str2 + "**************************" + str + "*******************************")
}
export {
    clear,
    consoleS,
    console_
}