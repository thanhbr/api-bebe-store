import chalk from "chalk";

class OutType {
    static INFORMATION = "INFORMATION";
    static SUCCESS = "SUCCESS";
    static WARNING = "WARNING";
    static ERROR = "ERROR";
}

function print(message, outputType) {
    switch(outputType) {
        case OutType.INFORMATION:
            console.log(chalk.white(message));
            break;
        case OutType.SUCCESS:
            console.log(chalk.green(message));
            break;
        case OutType.WARNING:
            console.log(chalk.yellow(message));
            break;
        case OutType.ERROR:
            console.log(chalk.red(message));
            break;
        default:
            console.log(chalk.white(message));
    }
}


export {
    OutType,
    print
}