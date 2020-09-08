export function pingjunData(start, step, num) {
    if (start === void 0) { start = 2000; }
    if (step === void 0) { step = 100; }
    if (num === void 0) { num = 101; }
    return Array.from(new Array(num).keys()).map(function (item) {
        return item * step + start;
    });
}
// module.exports = {
//   pingjunData,
// };
//# sourceMappingURL=mock.js.map