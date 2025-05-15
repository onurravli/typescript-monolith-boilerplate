import chalk from "chalk";
import { format } from "date-fns";

type LogLevel = "info" | "error" | "warn" | "debug" | "success";

enum LogColor {
  info = "blue",
  error = "red",
  warn = "yellow",
  debug = "gray",
  success = "green",
}

interface LogProps {
  message: string | object | number | boolean;
  level: LogLevel;
  context?: string;
}

class Logger {
  log(props: LogProps) {
    const logText = `${chalk[LogColor[props.level]](`[${format(new Date(), "yyyy-MM-dd HH:mm:ss")}]`)} ${chalk[LogColor[props.level]](`[${props.level.toUpperCase()}]`)} ${chalk.whiteBright(props.message)} ${props.context ? chalk.whiteBright(`[${props.context}]`) : ""}`;
    console.log(logText);
  }
  info(message: string, context?: string) {
    this.log({ message, level: "info", context });
  }
  error(message: string, context?: string) {
    this.log({ message, level: "error", context });
  }
  warn(message: string, context?: string) {
    this.log({ message, level: "warn", context });
  }
  debug(message: string, context?: string) {
    this.log({ message, level: "debug", context });
  }
  success(message: string, context?: string) {
    this.log({ message, level: "success", context });
  }
}

const logger = new Logger();

export default logger;
