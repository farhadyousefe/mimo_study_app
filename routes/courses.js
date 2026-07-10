import express from 'express';
import debug from 'debug';
import { Course, validateCourse } from '../models/Course.js';

//2. Initialize debuggers (namespaced for modular logging)
const httpDebug = debug('app:http'); // lowercase helps
// select debug color manually
dbDebug.color = 2;
appDebug.color = 3;
httpDebug.color = 5;

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { error, value } = validateCourse(req.body);
  if (error) {
    httpDebug(`Joi Validation Error: ${error.details[0].message}`);
    return res
      .status(400)
      .send(`Joi Validation Error: ${error.details[0].message}`);
  }
  const newCourse = new Course(value);
  await newCourse.save();
  return res.status(201).json(newCourse);
});

export default router;
