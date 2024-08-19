const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:deep1507@cluster0.rd0szsg.mongodb.net/DOCSO-DATA", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const DetailsSchema = new mongoose.Schema({
    DrName: {
        type: String,
        required: true,
        trim: true,
    },
    FirmName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    YOEstablishment: {
        type: Number, // Changed from String to Number
    },
    totJdReviews: {
        type: Number, // Changed from String to Number
    },
    building: {
        type: String,
        trim: true,
    },
    street: {
        type: String,
        trim: true,
    },
    area: {
        type: String,
        trim: true,
    },
    pincode: {
        type: String, // Pincode can be a string to accommodate leading zeros
        trim: true,
    },
    PhoneNumber: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    qualification: {
        type: String,
        trim: true,
    },
    award_certificate: [{
        name: { type: String, trim: true },
        awarded_by: { type: String, trim: true },
        year: { type: String, trim: true },
        type: { type: String, trim: true },
        images: [{ type: String }] // Array of image URLs
    }],
    Firm_Images: [{
        key: { type: String, trim: true },
        label: { type: String, trim: true },
        img_cnt: { type: Number },
        img_thumb: { type: String },
        pid: { type: String } // Or use Number if it is strictly numeric
    }],
    addressln: {
        type: String,
        trim: true,
    },
    categories: [{
        type: String,
        trim: true,
    }]
}, {
    collection: 'online-scrapped-data-doctors' // Specify the collection name here
});

module.exports = mongoose.model('Details', DetailsSchema);
