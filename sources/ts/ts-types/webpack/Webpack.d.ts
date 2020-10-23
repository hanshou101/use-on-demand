// @ts-ignore
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin';
// @ts-ignore
import {ForkTsCheckerWebpackPlugin}       from 'fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPlugin';

import webpack from 'webpack'

declare global {
  type ForkTsCheckerWebpackPlugin_Type = typeof ForkTsCheckerWebpackPlugin;
  type ForkTsCheckerNotifierWebpackPlugin_Type = typeof ForkTsCheckerNotifierWebpackPlugin;


  type WebpackType = typeof webpack
}
