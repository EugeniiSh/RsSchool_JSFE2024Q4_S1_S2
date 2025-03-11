import path from 'path'; /*Импорт модуля path, для удобного создания путей к файлам*/
import webpack from 'webpack'; /*Импорт стандартного модуля webpack*/

//Импорт типов
import { BuildMode, BuildPaths, BuilPlatform } from './config/build/types/types';

//Импорт функций
import { buildWebpack } from './config/build/buildWebpack';


interface EnvVariables /*Интерфейс для типизации переменных окружения, используемых в конфиге*/
{
  mode?: BuildMode,
  port?: number,
  analyzer?: boolean,
  platform?: BuilPlatform,
}

export default (env: EnvVariables) => 
{
  const paths: BuildPaths = 
  {
    entry: path.resolve(__dirname, 'src', 'dirt', 'index.ts'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
  }

  const config: webpack.Configuration = buildWebpack
  (
    {
      port: env.port ?? 3000,
      mode: env.mode ?? 'development',
      paths,
      analyzer: env.analyzer, /*Призапуске сборки добавить флаг -- --env analyzer=true*/
      platform: env.platform ?? 'desktop',
    }
  );

  return config;
}
