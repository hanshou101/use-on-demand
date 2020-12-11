import e from 'express';
var router = e.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
// module.exports = router;
export { router as usersRouter, };
//# sourceMappingURL=users.js.map