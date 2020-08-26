/**
 * 在【tsc编译】之后，复制【额外文件】到【最终输出文件夹】。
 *        1.如  一些外在的  【js lib库】。
 */


console.log('开始拷贝文件');

import ncp from 'ncp';
// import {ncp} from 'ncp';

// ncp.limit = 16;

const CopyCfg = {
  source     : 'sources',
  destination: 'lib',
  //
  options    : {
    //
    limit : 16,
    /**
     * 文件筛选规则：
     *        1.不包含【.ts】。
     *        2.但可以包含【.d.ts】
     *        3.不包含【.md】
     *        4.不包含【.vue】
     * 正则写法：
     *        1.此处，采用了一种变通方式。
     *                1.【后向查找】必须要【字符数相等】。我们此处用串联的方式改写（其实，这里是妥协的结果）。
     */
    filter: /.*((\.d\.ts)|(?<!(\.ts))(?<!(\.md))(?<!(\.vue)))$/,
    //
  } as ncp.Options,
};

ncp(CopyCfg.source, CopyCfg.destination, CopyCfg.options, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('done!');
});
