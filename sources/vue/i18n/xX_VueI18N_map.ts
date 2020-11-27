import fs                    from 'fs';
import path                  from 'path';
import { xX_SObject_Helper } from '../../symbol-object/SObject_Helper';


class xX_VueI18N_map_Util {

	static fromPath(fPath: string) {
		const str = fs.readFileSync(fPath, { encoding: 'utf-8' });
		console.log('str', str);
	}

	static extractMap(obj: object) {
		// console.log('obj', obj);
		const resultMap = xX_SObject_Helper.flatJson_toKeyChain(obj, {
			superDeep      : false,
			needRemainValue: false,
		});
		console.log('resultMap', resultMap);
		fs.writeFileSync(GlobalCfg.outDir + 'xX_map.json', JSON.stringify(resultMap, (k, v) => (v === undefined ? null : v), 2));
	}

}

// xX_VueI18N_map_Util.fromPath(
//   './src/project-config/i18n/zh.js'
// );


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const GlobalCfg = {
	// targetDir: '../../../../fgex_admin/src',
	outDir: './build/',
};

xX_VueI18N_map_Util.extractMap(
	require('../../../../fgex_admin/src/project-config/i18n/zh').zhCN,
);
