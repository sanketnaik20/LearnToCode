require('dotenv').config();
const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');
const Question = require('./models/Question');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/learntocode';

const { cPlusPlusCourse } = require('./data/courseData');
async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to DB for seeding...');

        // Clear existing
        await Lesson.deleteMany({});
        await Question.deleteMany({});

        let globalOrder = 0;
        for (const unit of cPlusPlusCourse.units) {
            for (const lessonData of unit.lessons) {
                const { questions, ...lessonFields } = lessonData;
                const lesson = new Lesson({
                    ...lessonFields,
                    order: globalOrder++
                });
                await lesson.save();

                for (const qData of questions) {
                    const question = new Question({
                        ...qData,
                        lessonId: lesson._id
                    });
                    await question.save();
                }
            }
        }

        console.log('Database seeded successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
