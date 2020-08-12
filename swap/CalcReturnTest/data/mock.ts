export function pingjunData(start = 2000, step = 100, num = 101) {
  return Array.from(new Array(num).keys()).map(item => {
    return item * step + start;
  });
}

// module.exports = {
//   pingjunData,
// };

