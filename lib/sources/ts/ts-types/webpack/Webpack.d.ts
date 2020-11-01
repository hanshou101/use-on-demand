// @ts-ignore
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin';
// @ts-ignore
import { ForkTsCheckerWebpackPlugin }     from 'fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPlugin';

import webpack from 'webpack';

import ChainableWebpackConfig = require('webpack-chain');

import { xX_NodeEnvE } from '../../../webpack/webpack-util';

declare global {
	type ForkTsCheckerWebpackPlugin_Type = typeof ForkTsCheckerWebpackPlugin;
	type ForkTsCheckerNotifierWebpackPlugin_Type = typeof ForkTsCheckerNotifierWebpackPlugin;


	type WebpackType = typeof webpack

	type ChainableWebpackConfig_Type = ChainableWebpackConfig;

	type xX_NodeEnvE_KeyType = keyof typeof xX_NodeEnvE;

}
