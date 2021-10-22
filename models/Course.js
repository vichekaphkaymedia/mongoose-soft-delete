const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const mongoosePaginate = require('mongoose-paginate-v2');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: 5,
        maxlength: 255
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v && v.length > 0
            },
            message: "A course should have at least one tag"
        }
    },
    category: {
        type: String,
        required: [true,'Category is required'],
        enum: {
            values: ['web','mobile','network'],
            message: '{VALUE} is not supported',
        },
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: [
            function(){
                console.log(this.isPublished)
                return this.isPublished
            },
            'Price is required'
        ],
        min: 20,
        max: 200
    }
},{
    timestamps: true
})

mongoose.set('returnOriginal',false)

CourseSchema.plugin(mongoose_delete,{
    deletedAt: true,
    indexFields: true,
    overrideMethods: true,
})

CourseSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Course',CourseSchema)