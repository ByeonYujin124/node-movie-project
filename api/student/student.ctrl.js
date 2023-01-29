const StudentModel = require("../../models/student")
const mongoose = require("mongoose");

//id 유효성 체크 
const checkId = (req, res, next) => {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).end();
    }

    next();
}

// 목록조회 (localhost:3000/api/music?limit=10)
// - 성공 : limit수만큼 music 객체를 담은 배열을 리턴 (200: OK)
// - 실패 : limit가 숫자형이 아닌 경우 (400 : Bad Request)
const list = (req, res, next) => {
    const limit = parseInt(req.query.limit || 10, 10);

    if (Number.isNaN(limit)) return res.status(400).end();
    
    StudentModel.find((err, result) => {
        if(err) return res.status(500).end(); //next(err); // return res.status(300)
        //res.json(result);
        res.render("student/list", { result });
    }).limit(limit)
    .sort({ _id: -1 }); //내림차순( 최근 등록한 것부터 )
};

// 상세조회 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 music 객체 리턴 (200: OK)
// - 실패 : 유효한 id가 아닌 경우 (400: Bad Request)
//          해당하는 id가 없는 경우(404 : Not Found)
const detail = (req, res) => {
    const id = req.params.id;

    StudentModel.findById(id, (err, result) => {
        if(err) return res.status(500).end();
        if(!result) return res.status(404).end();
        res.render("student/detail", {result});
    })
};

// 등록
// - 성공 : id는 채번하고, 입력받은 singer, title로
//          새로운 객체를 만들어서 배열에 추가 (201 : Created)
// - 실패 : singer, title 값이 없는 경우 (400: Bad Request)
const create = (req, res) => {
    const { name, birth, tel, age, cls } = req.body;
    if (!name || !birth || !tel || !age || !cls) return res.status(400).send("입력값 오류입니다.");

// 1. Document.save()
// const music = new MusicModel({singer, title});
// music.save((err, result) => {
//     if (err) return res.status(500).end() //throw err;
//     res.status(201).json(result);
//     });

// 2. MusicModel.create()
    StudentModel.create({ name, birth, tel, age, cls }, (err, result) => {
        if (err) return res.status(500).send("등록 시 오류가 발생했습니다.");
        res.status(201).json(result);
    })
};

// 수정 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 객체에 입력값으로 업데이트하고 객체 반환 (200: Ok)
// - 실패 : id가 유효하지 않는 경우 ( 400: Bad Request )
//          해당하는 id가 없는 경우( 404 : Not Found)
const update = (req, res) => {
    const id = req.params.id;
    
    const { name, birth, tel, age, cls } = req.body;

    StudentModel.findByIdAndUpdate(
        id, 
        { name, birth, tel, age, cls},
        { new: true}, 
        (err, result) => {
            if(err) return res.status(500).end();
            if(!result) return res.status(404).end();
            res.json(result);
        });
};

// 삭제 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 객체를 배열에서 삭제 후 배열 리턴 (200 : Ok)
// - 실패 : id가 숫자가 아닌 경우 (400: Bad Request)
//          해당하는 id가 없는 경우 (404: Not Found)
const remove = (req, res) => {
    const id = req.params.id;

    StudentModel.findByIdAndDelete(id, (err, result) => {
        if(err) return res.status(500).send();
        if(!result) return res.status(404).send();
        res.json(result);
    })
};


const showCreatePage = (req, res) => {
    res.render("student/create");
}

const showUpdatePage = (req, res) => {
    const id = req.params.id;

    StudentModel.findById(id, (err, result) => {
        if (err) return res.statue(500).send("조회 시 오류가 발생했습니다.");
        if (!result) return res.statue(404).send("해당하는 정보가 없습니다.");
        res.render("student/update", { result });
    });
};
module.exports = { list, detail, create, update, remove, checkId, showCreatePage, showUpdatePage};