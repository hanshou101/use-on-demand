const BOM = '\uFEFF';

function getXLSX() {
  return import('xlsx');
}

function getFileSaver() {
  return import('file-saver');
}

function getJsZip() {
  return import('jszip');
}

export class xX_CVS_Excel_Helper {

  /**
   * 先将二维数组转成纯文本，重点是要处理可能在内容中出现的分隔符和双引号：
   */
  public static arrayToCsv(data: any, args: { columnDelimiter?: string, lineDelimiter?: string } = {}) {
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

  /**
   * 导出cvs文件
   *        1.有空，要好好看看这段代码。可拓展面应该很广。
   */
  public static exportCsv(inputData: any, filename = 'export.csv') {
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

  /**
   * 从【】，触发【下载Excel】操作
   */
  public static downloadExcel(
    url: string,
    filename = 'export.xls',
  ) {
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


  /**
   * 从Excel文件中，获取某些行列。
   */
  public static readArr_fromExcel(
    excel_file: File,        // 传入的Excel文件
    sheet_field: any,       // 筛选特定字段
    inputDom: any,          // <input>节点，用于清除value
  ) {

    return new Promise((resolve, reject) => {
      getXLSX().then((XLSX) => {                         // 动态导入
        // 声明回调
        const fileOnLoadCb = function (event: any) {
          console.log('event', event);
          let data                = null;
          let workbook            = null;
          let persons: Array<any> = [];

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
      }).catch((e) => {
        reject(e);
      });

    });

  }

  /**
   * 将文本，导出为【ZIP文件】
   */
  public export_txt_to_zip(
    th: any,
    jsonData: any,
    txtName: string,
    zipName: string,
  ) {
    return new Promise((resolve, reject) => {
      require('script-loader!file-saver');
      getJsZip().then((exports) => {                                         // 导入库
        const JSZip    = exports.default;
        const zip      = new JSZip();
        const txt_name = txtName || 'file';
        const zip_name = zipName || 'file';
        const data     = jsonData;
        let txtData    = `${th}\r\n`;
        data.forEach((row: any) => {
          let tempStr = '';
          tempStr     = row.toString();
          txtData += `${tempStr}\r\n`;
        });
        zip.file(`${txt_name}.txt`, txtData);
        zip.generateAsync({type: 'blob'}).then((blob) => {
          getFileSaver().then((FileSaver) => {                              // 导入库
            FileSaver.saveAs(blob, `${zip_name}.zip`);    // FIXME ？？？？？？
            resolve();
          }).catch((e) => [
            reject(e),
          ]);
        }, (err) => {
          // alert(i18n.t('message.Export_Failure'));
          alert(`导出失败！${err}`);
          reject(err);
        });
      }).catch((e) => {
        reject(e);
      });
    });
  }

  /**
   *
   */
  public static export_table_to_excel(id: string) {
    const theTable = document.getElementById(id) as HTMLFormElement;
    const oo       = generateArray(theTable);
    const ranges   = oo[1];

    /* original data */
    const data    = oo[0];
    const ws_name = 'SheetJS';

    getXLSX().then((XLSX) => {

      const wb = new WorkbookSimple();
      const ws = sheet_from_array_of_arrays(XLSX, data);

      /* add ranges to worksheet */
      // ws['!cols'] = ['apple', 'banan'];
      ws['!merges'] = ranges;

      /* add worksheet to workbook */
      wb.SheetNames.push(ws_name);
      wb.Sheets[ws_name] = ws;

      const wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'});
      getFileSaver().then((FileSaver) => {
        FileSaver.saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), 'test.xlsx');
      }).catch((e) => {
        console.error(e);
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  public export_json_to_excel({header, _data, filename = 'excel-list', autoWidth = true}: any = {}) {
    console.log('initial export');
    /* original data */
    const data = [..._data];
    data.unshift(header);
    const ws_name = 'SheetJS';
    console.log('startingsheet_from_array_of_arrays');

    getXLSX().then((XLSX) => {

      const wb = new WorkbookSimple();
      const ws = sheet_from_array_of_arrays(XLSX, data);

      if (autoWidth) {
        /*设置worksheet每列的最大宽度*/
        const colWidth = data.map((row: any) => row.map((val: any) => {
          /*先判断是否为null/undefined*/
          if (val == null) {
            return {wch: 10};
          } else if (val.toString().charCodeAt(0) > 255) {
            return {wch: val.toString().length * 2};
          } else {
            return {wch: val.toString().length};
          }
        }));
        /*以第一行为初始值*/
        const result = colWidth[0];
        for (let i = 1; i < colWidth.length; i++) {
          for (let j = 0; j < colWidth[i].length; j++) {
            if (result[j].wch < colWidth[i][j].wch) {
              result[j].wch = colWidth[i][j].wch;
            }
          }
        }
        ws['!cols'] = result;
      }
      console.log(' wb.SheetNames.push(ws_name);');
      /* add worksheet to workbook */
      wb.SheetNames.push(ws_name);
      wb.Sheets[ws_name] = ws;
      console.log('wbout');
      const wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'});
      getFileSaver().then((FileSaver) => {
        FileSaver.saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), filename + '.xlsx');
      }).catch((e) => {
        console.error(e);
      });
    }).catch((e) => {
      console.error(e);
    });
  }


}


//
//
//
//
//
//


function generateArray(
  table: HTMLFormElement,
) {
  const out    = [];
  const rows   = table.querySelectorAll('tr');
  const ranges = [];
  for (let R = 0; R < rows.length; ++R) {
    const outRow  = [];
    const row     = rows[R];
    const columns = row.querySelectorAll('td');
    for (let C = 0; C < columns.length; ++C) {
      const cell                     = columns[C];
      let colspan                    = cell.getAttribute('colspan');
      let rowspan                    = cell.getAttribute('rowspan');
      let cellValue: string | number = cell.innerText;
      // @ts-ignore
      if (cellValue !== '' && (cellValue == +cellValue)) {
        cellValue = +cellValue;
      }

      // Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (let i = 0; i <= range.e.c - range.s.c; ++i) {
            outRow.push(null);
          }
        }
      });

      // Handle Row Span
      if (rowspan || colspan) {
        // @ts-ignore
        rowspan = rowspan || 1;
        // @ts-ignore
        colspan = colspan || 1;
        // @ts-ignore
        ranges.push({s: {r: R, c: outRow.length}, e: {r: R + rowspan - 1, c: outRow.length + colspan - 1}});
      }


      // Handle Value
      outRow.push(cellValue !== '' ? cellValue : null);

      // Handle Colspan
      if (colspan) {
        // @ts-ignore
        for (let k = 0; k < colspan - 1; ++k) {
          outRow.push(null);
        }
      }
    }
    out.push(outRow);
  }
  return [out, ranges];
}

function s2ab(s: any) {
  const buf  = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i != s.length; ++i) {
    // @ts-ignore
    // tslint:disable-next-line
    // tslint:disable-next-line:no-bitwise
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
}

//
// function Workbook(this: any) {
//   if (!(this instanceof Workbook)) {
//     return new Workbook();
//   }
//   this.SheetNames = [];
//   this.Sheets     = {};
// }
//

class WorkbookSimple {
  public SheetNames: Array<string>         = [];
  public Sheets: { [key in string]: any; } = {};
}

function sheet_from_array_of_arrays(
  _XLSX: XLSX_Type,
  data: any,
  opts?: any,
) {

  const ws: any = {};
  const range   = {
    s: {
      c: 10000000,
      r: 10000000,
    },
    e: {
      c: 0,
      r: 0,
    },
  };
  for (let R = 0; R != data.length; ++R) {
    for (let C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) {
        range.s.r = R;
      }
      if (range.s.c > C) {
        range.s.c = C;
      }
      if (range.e.r < R) {
        range.e.r = R;
      }
      if (range.e.c < C) {
        range.e.c = C;
      }
      const cell: any = {
        v: data[R][C],
      };
      if (cell.v == null) {
        continue;
      }
      const cell_ref = _XLSX.utils.encode_cell({
        c: C,
        r: R,
      });

      if (typeof cell.v === 'number') {
        cell.t = 'n';
      } else if (typeof cell.v === 'boolean') {
        cell.t = 'b';
      } else if (cell.v instanceof Date) {
        cell.t = 'n';
        // @ts-ignore
        cell.z = _XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else {
        cell.t = 's';
      }

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) {
    ws['!ref'] = _XLSX.utils.encode_range(range);
  }
  return ws;
}

function datenum(
  _v: string,
  date1904?: unknown,
) {
  let v = _v;
  if (date1904) {
    v += 1462;
  }
  const epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30)).valueOf()) / (24 * 60 * 60 * 1000);
}
