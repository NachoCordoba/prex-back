import DateUtil from "../../utils/date.util";

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";

export default class Logger {
    private static instance: Logger;
    private constructor() {}

    public static getInstance(): Logger {
        if (!this.instance) {
            this.instance = new Logger();
        }
        return this.instance;
    }

    public info({ module, msg }:{ module: string, msg: string }){
        console.info(`${BLUE} ${DateUtil.getFullDate(new Date())} [${module}]: ${msg} ${RESET}`)
    }
}