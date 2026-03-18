import webpack, { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'; 
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

export function buildPlugins(options: BuildOptions): Configuration['plugins']
{
  const isDev = options.mode === 'development'; 
  const isProd = options.mode === 'production';

  const plugins: Configuration['plugins'] = 
  [
    new HtmlWebpackPlugin 
    (
      { 
        template: options.paths.html, 
        // favicon: path.resolve(options.paths.public, 'favicon.ico') /*путь к favicon*/
      }
    ), 
    new DefinePlugin 
    (
      {
        __PLATFORM__: JSON.stringify(options.platform),
        __ENV__: JSON.stringify(options.mode),
      }
    ),
   
  ];

  if(isDev)
  {
    plugins.push(new webpack.ProgressPlugin());
  }

  if(isProd)
  {
    plugins.push
    (
      new MiniCssExtractPlugin 
      (
        {
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        }
      )
    );

    plugins.push
    (
      new CopyPlugin
      (
        {
          patterns: 
          [
            { 
              from: path.resolve(options.paths.src, 'dirt'), 
              to: path.resolve(options.paths.src, 'clean') 
            },
            { 
              from: path.resolve(options.paths.public, 'static'), 
              to: path.resolve(options.paths.output, 'static') 
            },
          ],
        }
      )
    );
  }

  return plugins;
}