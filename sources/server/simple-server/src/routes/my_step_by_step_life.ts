import e from 'express';

const router = e.Router();

/* GET users listing. */
router.get('/', function (req: e.Request, res: e.Response, next: e.NextFunction) {
  res.sendfile('public/dist-MyBestLife-MyBestProject/index.html');
});

// module.exports = router;
export {
  router as myStepByStepLife_router,
};
