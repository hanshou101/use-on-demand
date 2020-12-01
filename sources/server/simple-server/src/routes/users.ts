import e from 'express';

const router = e.Router();

/* GET users listing. */
router.get('/', function (req: e.Request, res: e.Response, next: e.NextFunction) {
  res.send('respond with a resource');
});

// module.exports = router;
export {
  router as usersRouter,
};
