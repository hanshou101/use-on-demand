import e from 'express';
var router = e.Router();
/* GET users listing. */
router.get('/concurrent-test', function (req, res, next) {
    res.sendfile('public/guoqiong/index.html');
});
// module.exports = router;
export { router as guoqiongRouter, };
//# sourceMappingURL=guoqiong.js.map