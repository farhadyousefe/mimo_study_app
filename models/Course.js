import mongoose from 'mongoose';
import Joi, { string } from 'joi';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 100,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    languages: {
      type: String,
      trim: true,
      required: true,
      enum: ['Pashto', 'Dari', 'English'],
    },
    lessons: [
      {
        lessonId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          trim: true,
          required: true,
        },
        xpReward: {
          type: Number,
          required: true,
          default: 100,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

function validateCourse(courseData) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().required(),
    languages: Joi.string().required().valid('Pashto', 'Dari', 'English'),
    lessons: Joi.array()
      .items(
        Joi.object({
          lessonId: Joi.string().required(),
          name: Joi.string().required(),
          xpReward: Joi.number().required().default(100),
        })
      )
      .required(),
  });
  return schema.validate(courseData);
}

export { Course, validateCourse };
