import { Router } from 'express';
var r_myStepByStepLife = Router();
r_myStepByStepLife.get('/', function (req, res, next) {
    res.sendfile('public/dist-MyBestLife-MyBestProject/index.html');
});
export { r_myStepByStepLife, };
//# sourceMappingURL=my_step_by_step_life.js.map