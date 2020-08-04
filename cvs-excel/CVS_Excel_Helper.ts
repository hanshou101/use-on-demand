const BOM = '\uFEFF';

export class CVS_Excel_Helper {


// 先将二维数组转成纯文本，重点是要处理可能在内容中出现的分隔符和双引号：
  static arrayToCsv(data: any, args: { columnDelimiter?: string, lineDelimiter?: string } = {}) {
    const columnDelimiter = args.columnDelimiter || ',';
    const lineDelimiter   = args.lineDelimiter || '\n';

    return data.reduce((csv?: any, row?: any) => {
      const rowContent = Array.isArray(row)
        ? row.reduce((rowTemp, col) => {
          let ret = rowTemp ? rowTemp + columnDelimiter : rowTemp;
          if (col) {
            const formatedCol = col.toString().replace(new RegExp(lineDelimiter, 'g'), ' ');
            ret += /,/.test(formatedCol) ? `"${formatedCol}"` : formatedCol;
          }
          return ret;
        }, '')
        : row;
      return (csv ? csv + lineDelimiter : '') + rowContent;
    }, '');
  }

// TIP 导出cvs文件                                                    // 有空，要好好看看这段代码。可拓展面应该很广。
  static exportCsv(inputData: any, filename = 'export.csv') {
    // const csv = arrayToCsv(inputData);
    const csv = inputData;

    if (navigator.msSaveOrOpenBlob) {
      const blob = new Blob([BOM + csv], {
        type: 'text/csv;charset=utf-8;',
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const uri             = encodeURI(`data:text/csv;charset=utf-8,${BOM}${csv}`);
      const downloadLink    = document.createElement('a');
      downloadLink.href     = uri;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  static downloadExcel(url: string, filename = 'export.xls') {
    // 创建隐藏的可下载链接
    const eleLink         = document.createElement('a');
    eleLink.download      = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    // const blob = new Blob([content]);
    eleLink.href = url;
    console.log('记录一下，export出的url，为多少。', url);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);

  }


// 从Excel文件中，获取某些行列。
  /**
   *
   * @param excel_file          传入的Excel文件
   * @param sheet_field         筛选特定字段
   * @param inputDom            <input>节点，用于清除value
   * @returns {Promise<any>}    直接交给 await/async 使用
   */
  static readArr_fromExcel(excel_file: any, sheet_field: any, inputDom: any) {

    return new Promise((resolve, reject) => {
      import('xlsx').then(XLSX => {                         // 动态导入
        // 声明回调
        const fileOnLoadCb = function (event: any) {
          console.log('event', event);
          let data           = null;
          let workbook       = null;
          let persons: any[] = [];

          // 读取数据
          try {
            data     = event.target.result;
            workbook = XLSX.read(data, {
              type: 'binary',
            });
          } catch (e) {
            console.log('文件类型不正确，', e);
            reject(e);   // TODO Promise失败返回
            return;
          }

          // 表格的表格范围，可用于判断表头，数量是否正确
          let from_To: any = '';
          // 遍历每张表，读取
          const _sheets    = workbook.Sheets;
          for (const sheet in _sheets) {
            // 安全判断，是否有该属性
            if (_sheets.hasOwnProperty(sheet)) {
              // 表格范围
              from_To = _sheets[sheet]['!ref'];
              console.log('表格范围', from_To);
              // 拼接列表
              persons = persons.concat(XLSX.utils.sheet_to_json(_sheets[sheet]));

              // 此处，如果只取第一张sheet，就取消下面这行注释
              // break
            }
          }

          inputDom.value = '';   // TODO 清除掉<input>的value值，这样可以实现多次重复上传。（针对onchange）
          console.log('读取的列表', persons);
          resolve(persons);  // TODO Promise成功返回

        };

        const fileReader  = new FileReader();
        fileReader.onload = fileOnLoadCb;
        fileReader.readAsBinaryString(excel_file);
      }).catch(e => {
        reject(e);
      });

    });

  }

}
