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

// module.exports =  /*Вариант создания и экспорта конфига напрямую через объект*/
// module.exports = (env) => /*Вариант создания и экспорта конфига, через функцию, для получения возможности использовать перменные окружения внутри конфига*/
export default (env: EnvVariables) => /*Вариант создания и экспорта конфига, через функцию, для получения возможности использовать перменные окружения внутри конфига. С использованием TS и ES6 модулей*/
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


/* Использованные команды */
/*
npm install --save-dev webpack
npm install --save-dev webpack-cli
npm install --save-dev html-webpack-plugin
npm install --save-dev typescript
npm install --save-dev ts-loader
npm install --save-dev ts-node
npm install --save-dev fork-ts-checker-webpack-plugin
npm install --save-dev @types/node
npm install --save-dev @types/webpack
npm install --save-dev @types/webpack-dev-server
npm install --save-dev webpack-dev-server
npm install --save-dev copy-webpack-plugin 

npm install react
npm install react-dom
npm install react-router-dom
npm install --save-dev @types/react
npm install --save-dev @types/react-dom
npm install --save-dev react-refresh
npm install --save-dev @pmmmwh/react-refresh-webpack-plugin 
npm install --save-dev react-refresh-typescript

npm install --save-dev style-loader
npm install --save-dev css-loader
npm install --save-dev sass
npm install --save-dev sass-loader
npm install --save-dev mini-css-extract-plugin

npm install --save-dev webpack-bundle-analyzer
npm install --save-dev @types/webpack-bundle-analyzer

npm install --save-dev @svgr/webpack

npm install --save-dev babel-loader
npm install --save-dev @babel/core
npm install --save-dev @types/babel__core
npm install --save-dev @babel/preset-typescript
npm install --save-dev @babel/preset-react
*/