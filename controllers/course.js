const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const errorResponse = require('../utils/errorResponse');

const coursePaginate = asyncHandler(async (req, res) => {
    const options = {
        page: 1,
        limit: 10,
        collation: {
            locale: 'en',
        },
    };
    const courses = await Course.paginate({}, options);
    res.send(courses);
});

const index = asyncHandler(async (req, res) => {
    const courses = await Course.find();
    res.send(courses);
});

const create = asyncHandler(async (req, res) => {
    const course = await Course.create(req.body);
    res.status(201).send(course);
})

const show = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(new errorResponse('Course not found', 404));
    }
    res.send(course);
})

const update = asyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        tags: req.body.tags,
        author: req.body.author,
        price: req.body.price
    });
    if (!course) {
        return next(new errorResponse('Course not found', 404));
    }
    res.send(course);
})

const destroy = asyncHandler(async (req, res, next) => {
    const course = await Course.delete({_id: req.params.id})
    if (!course) {
        return next(new errorResponse('Course not found', 404));
    }
    res.status(204).send();
})

const trash = asyncHandler(async (req, res) => {
    const deletedCourses = await Course.findDeleted({});
    res.send(deletedCourses);
});

const restore = asyncHandler(async (req, res, next) => {
    const {nModified} = await Course.restore({_id: req.params.id});
    if (nModified === 0) {
        return next(new errorResponse('Course not found', 404));
    }
    let course = await Course.findById(req.params.id);
    res.send(course);
})

module.exports = {index, create, show, update, destroy, trash, restore, coursePaginate};