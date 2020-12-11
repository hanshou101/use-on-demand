import e from 'express';
var router = e.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.sendfile('public/dist-MyBestLife-MyBestProject/index.html');
});
// module.exports = router;
export { router as myStepByStepLife_router, };
//# sourceMappingURL=my_step_by_step_life.js.map