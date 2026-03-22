import type { Configuration as DevServerConfiguration } from "webpack-dev-server"; /*Импорт типов для webpack-dev-server, для возможности настройки дев сервера в конфиге на TS*/
import { BuildOptions } from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration
{
  return {
    port: options.port ?? 3000, 
    open: true, 
    historyApiFallback: true, 
    hot: true,
  }
}