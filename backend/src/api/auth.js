const app = require("express")
const user = require("../service/user")

let router = new app.Router()

router.post("/signup", user.create)

router.post("/login", user.login)

router.get("/getUser", verifyAccessToken([Roles.Editor]), user.getUser)

router.delete('/deleteUser', user.deleteUser)

module.exports = router