import e from 'express';

const router = e.Router();

/* GET users listing. */
router.get('/concurrent-test', function (req: e.Request, res: e.Response, next: e.NextFunction) {
  res.sendfile('public/guoqiong/index.html');
});

// module.exports = router;
export {
  router as guoqiongRouter,
};
