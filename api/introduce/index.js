const express = require('express');
const router = express.Router();
const ctrl = require("./introduce.ctrl");

router.get("/about", ctrl.showAboutPage); //회원가입 페이지
router.get("/notice", ctrl.showNoticePage); //로그인 페이지
// router.get("/logout", ctrl.logout); //로그아웃

// router.post("/signup", ctrl.signup); //회원가입
// router.post("/login", ctrl.login); //로그인
module.exports = router;
