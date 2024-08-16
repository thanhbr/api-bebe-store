import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("List students");
});

router.get("/:id", (req, res) => {
    res.send("Detail student by id " + req?.params?.id ?? "");
});

router.post("/", (req, res) => {
    res.send("Created student");
});

router.patch("/", (req, res) => {
    res.send("PATCH (create new object if not exists) insert student")
})

export default router;