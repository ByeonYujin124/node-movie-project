// 비구조화 할당
// const express = require("express");
// const router = express.Router();
const { Router } = require("express");
const router = Router();

router.use("/student", require("./student"));
router.use("/teacher", require("./teacher"));
router.use("/check", require("./check"));
router.use("/user", require("./user"));
router.use("/introduce", require("./introduce"));

module.exports = router;