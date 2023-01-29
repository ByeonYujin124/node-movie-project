const express = require('express');
const router = express.Router();
const ctrl = require("./check.ctrl");

// /student + / = /student
router.get("/", ctrl.list); // 목록조회
router.get("/new", ctrl.showCreatePage); //등록 페이지 보여주기
router.get("/:date",ctrl.checkId, ctrl.list); // 상세조회
router.get("/:id/edit", ctrl.checkId, ctrl.showUpdatePage); //

router.post("/", ctrl.create); // 등록
router.put("/:id",ctrl.checkId, ctrl.update); //수정
router.delete("/:id",ctrl.checkId, ctrl.remove); // 삭제
module.exports = router;
