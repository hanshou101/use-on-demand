import { __read, __spread } from "tslib";
var BOM = '\uFEFF';
function getXLSX() {
    return import('xlsx');
}
function getFileSaver() {
    return import('file-saver');
}
function getJsZip() {
    return import('jszip');
}
var CVS_Excel_Helper = /** @class */ (function () {
    function CVS_Excel_Helper() {
    }
    /**
     * 先将二维数组转成纯文本，重点是要处理可能在内容中出现的分隔符和双引号：
     */
    CVS_Excel_Helper.arrayToCsv = function (data, args) {
        if (args === void 0) { args = {}; }
        var columnDelimiter = args.columnDelimiter || ',';
        var lineDelimiter = args.lineDelimiter || '\n';
        return data.reduce(function (csv, row) {
            var rowContent = Array.isArray(row)
                ? row.reduce(function (rowTemp, col) {
                    var ret = rowTemp ? rowTemp + columnDelimiter : rowTemp;
                    if (col) {
                        var formatedCol = col.toString().replace(new RegExp(lineDelimiter, 'g'), ' ');
                        ret += /,/.test(formatedCol) ? "\"" + formatedCol + "\"" : formatedCol;
                    }
                    return ret;
                }, '')
                : row;
            return (csv ? csv + lineDelimiter : '') + rowContent;
        }, '');
    };
    /**
     * 导出cvs文件
     *        1.有空，要好好看看这段代码。可拓展面应该很广。
     */
    CVS_Excel_Helper.exportCsv = function (inputData, filename) {
        if (filename === void 0) { filename = 'export.csv'; }
        // const csv = arrayToCsv(inputData);
        var csv = inputData;
        if (navigator.msSaveOrOpenBlob) {
            var blob = new Blob([BOM + csv], {
                type: 'text/csv;charset=utf-8;',
            });
            navigator.msSaveOrOpenBlob(blob, filename);
        }
        else {
            var uri = encodeURI("data:text/csv;charset=utf-8," + BOM + csv);
            var downloadLink = document.createElement('a');
            downloadLink.href = uri;
            downloadLink.download = filename;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };
    /**
     * 从【】，触发【下载Excel】操作
     */
    CVS_Excel_Helper.downloadExcel = function (url, filename) {
        if (filename === void 0) { filename = 'export.xls'; }
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a');
        eleLink.download = filename;
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
    };
    /**
     * 从Excel文件中，获取某些行列。
     */
    CVS_Excel_Helper.readArr_fromExcel = function (excel_file, // 传入的Excel文件
    sheet_field, // 筛选特定字段
    inputDom) {
        return new Promise(function (resolve, reject) {
            getXLSX().then(function (XLSX) {
                // 声明回调
                var fileOnLoadCb = function (event) {
                    console.log('event', event);
                    var data = null;
                    var workbook = null;
                    var persons = [];
                    // 读取数据
                    try {
                        data = event.target.result;
                        workbook = XLSX.read(data, {
                            type: 'binary',
                        });
                    }
                    catch (e) {
                        console.log('文件类型不正确，', e);
                        reject(e); // TODO Promise失败返回
                        return;
                    }
                    // 表格的表格范围，可用于判断表头，数量是否正确
                    var from_To = '';
                    // 遍历每张表，读取
                    var _sheets = workbook.Sheets;
                    for (var sheet in _sheets) {
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
                    inputDom.value = ''; // TODO 清除掉<input>的value值，这样可以实现多次重复上传。（针对onchange）
                    console.log('读取的列表', persons);
                    resolve(persons); // TODO Promise成功返回
                };
                var fileReader = new FileReader();
                fileReader.onload = fileOnLoadCb;
                fileReader.readAsBinaryString(excel_file);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * 将文本，导出为【ZIP文件】
     */
    CVS_Excel_Helper.prototype.export_txt_to_zip = function (th, jsonData, txtName, zipName) {
        return new Promise(function (resolve, reject) {
            require('script-loader!file-saver');
            getJsZip().then(function (exports) {
                var JSZip = exports.default;
                var zip = new JSZip();
                var txt_name = txtName || 'file';
                var zip_name = zipName || 'file';
                var data = jsonData;
                var txtData = th + "\r\n";
                data.forEach(function (row) {
                    var tempStr = '';
                    tempStr = row.toString();
                    txtData += tempStr + "\r\n";
                });
                zip.file(txt_name + ".txt", txtData);
                zip.generateAsync({ type: 'blob' }).then(function (blob) {
                    getFileSaver().then(function (FileSaver) {
                        FileSaver.saveAs(blob, zip_name + ".zip"); // FIXME ？？？？？？
                        resolve();
                    }).catch(function (e) { return [
                        reject(e),
                    ]; });
                }, function (err) {
                    // alert(i18n.t('message.Export_Failure'));
                    alert("\u5BFC\u51FA\u5931\u8D25\uFF01" + err);
                    reject(err);
                });
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     *
     */
    CVS_Excel_Helper.export_table_to_excel = function (id) {
        var theTable = document.getElementById(id);
        var oo = generateArray(theTable);
        var ranges = oo[1];
        /* original data */
        var data = oo[0];
        var ws_name = 'SheetJS';
        getXLSX().then(function (XLSX) {
            var wb = new WorkbookSimple();
            var ws = sheet_from_array_of_arrays(XLSX, data);
            /* add ranges to worksheet */
            // ws['!cols'] = ['apple', 'banan'];
            ws['!merges'] = ranges;
            /* add worksheet to workbook */
            wb.SheetNames.push(ws_name);
            wb.Sheets[ws_name] = ws;
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });
            getFileSaver().then(function (FileSaver) {
                FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'test.xlsx');
            }).catch(function (e) {
                console.error(e);
            });
        }).catch(function (e) {
            console.error(e);
        });
    };
    CVS_Excel_Helper.prototype.export_json_to_excel = function (_a) {
        var _b = _a === void 0 ? {} : _a, header = _b.header, _data = _b._data, _c = _b.filename, filename = _c === void 0 ? 'excel-list' : _c, _d = _b.autoWidth, autoWidth = _d === void 0 ? true : _d;
        console.log('initial export');
        /* original data */
        var data = __spread(_data);
        data.unshift(header);
        var ws_name = 'SheetJS';
        console.log('startingsheet_from_array_of_arrays');
        getXLSX().then(function (XLSX) {
            var wb = new WorkbookSimple();
            var ws = sheet_from_array_of_arrays(XLSX, data);
            if (autoWidth) {
                /*设置worksheet每列的最大宽度*/
                var colWidth = data.map(function (row) { return row.map(function (val) {
                    /*先判断是否为null/undefined*/
                    if (val == null) {
                        return { wch: 10 };
                    }
                    else if (val.toString().charCodeAt(0) > 255) {
                        return { wch: val.toString().length * 2 };
                    }
                    else {
                        return { wch: val.toString().length };
                    }
                }); });
                /*以第一行为初始值*/
                var result = colWidth[0];
                for (var i = 1; i < colWidth.length; i++) {
                    for (var j = 0; j < colWidth[i].length; j++) {
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
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });
            getFileSaver().then(function (FileSaver) {
                FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), filename + '.xlsx');
            }).catch(function (e) {
                console.error(e);
            });
        }).catch(function (e) {
            console.error(e);
        });
    };
    return CVS_Excel_Helper;
}());
export { CVS_Excel_Helper };
//
//
//
//
//
//
function generateArray(table) {
    var out = [];
    var rows = table.querySelectorAll('tr');
    var ranges = [];
    var _loop_1 = function (R) {
        var outRow = [];
        var row = rows[R];
        var columns = row.querySelectorAll('td');
        for (var C = 0; C < columns.length; ++C) {
            var cell = columns[C];
            var colspan = cell.getAttribute('colspan');
            var rowspan = cell.getAttribute('rowspan');
            var cellValue = cell.innerText;
            // @ts-ignore
            if (cellValue !== '' && (cellValue == +cellValue)) {
                cellValue = +cellValue;
            }
            // Skip ranges
            ranges.forEach(function (range) {
                if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                    for (var i = 0; i <= range.e.c - range.s.c; ++i) {
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
                ranges.push({ s: { r: R, c: outRow.length }, e: { r: R + rowspan - 1, c: outRow.length + colspan - 1 } });
            }
            // Handle Value
            outRow.push(cellValue !== '' ? cellValue : null);
            // Handle Colspan
            if (colspan) {
                // @ts-ignore
                for (var k = 0; k < colspan - 1; ++k) {
                    outRow.push(null);
                }
            }
        }
        out.push(outRow);
    };
    for (var R = 0; R < rows.length; ++R) {
        _loop_1(R);
    }
    return [out, ranges];
}
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) {
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
var WorkbookSimple = /** @class */ (function () {
    function WorkbookSimple() {
        this.SheetNames = [];
        this.Sheets = {};
    }
    return WorkbookSimple;
}());
function sheet_from_array_of_arrays(_XLSX, data, opts) {
    var ws = {};
    var range = {
        s: {
            c: 10000000,
            r: 10000000,
        },
        e: {
            c: 0,
            r: 0,
        },
    };
    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
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
            var cell = {
                v: data[R][C],
            };
            if (cell.v == null) {
                continue;
            }
            var cell_ref = _XLSX.utils.encode_cell({
                c: C,
                r: R,
            });
            if (typeof cell.v === 'number') {
                cell.t = 'n';
            }
            else if (typeof cell.v === 'boolean') {
                cell.t = 'b';
            }
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                // @ts-ignore
                cell.z = _XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            }
            else {
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
function datenum(_v, date1904) {
    var v = _v;
    if (date1904) {
        v += 1462;
    }
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30)).valueOf()) / (24 * 60 * 60 * 1000);
}
//# sourceMappingURL=CVS_Excel_Helper.js.map