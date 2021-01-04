import {Router, Request, Response, NextFunction} from 'express';

const r_myStepByStepLife = Router();
r_myStepByStepLife.get('/', function(req : Request, res : Response, next : NextFunction){
  res.sendfile('public/dist-MyBestLife-MyBestProject/index.html');
});

export {
  r_myStepByStepLife,
};
