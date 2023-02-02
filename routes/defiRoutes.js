const express = require("express")
const router = express.Router()
const {
    viewProtocols,
    addProtocol,
    deleteProtocol,
    updateEntireProtocol,
    updateSingleInfo,
} = require("../controllers/defiController")

router.route("/").get(viewProtocols).post(addProtocol)
router.route("/:id").delete(deleteProtocol).put(updateEntireProtocol).patch(updateSingleInfo)

module.exports = router
