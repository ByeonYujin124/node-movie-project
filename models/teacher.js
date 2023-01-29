const mongoose = require("mongoose");

// 스키마 정의
const TeacherSchema = new mongoose.Schema({
    name: {
        type: String, 
        trim: true,
        required: true,
    },
    birth: {
        type: String,
        trim: true,
        required: true
    },
    tel: {
        type: String,
        trim: true,
        required: true
    },
    cls: {
        type: String,
        require: true,
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

// 모델 생성
// model(모델명, 스키마) -> 모델명s 컬렉션에 작업함
// model(모델명, 스키마, 컬렉션명)
const Teacher = mongoose.model("teacher", TeacherSchema);
module.exports = Teacher;
