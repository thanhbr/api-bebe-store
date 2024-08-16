const getList = async (req, res) => {
    res.status(200).json({
        message: "Get students successfully",
        data: [
            {
                id: 1,
                name: "Thi Tit"
            },
            {
                id: 2,
                name: "Van A"
            }
        ]
    });
};

const getDetail = async (req, res) => {
    res.send("GET detail by id: " + req?.params?.id);
};

const create = async(req, res) => {
    res.status(201).json({
        message: "Created student successfully"
    });
};

const update = async (req, res) => {
    res.send("PATCH(create new object if not exists)");
};

export default {
    getList,
    getDetail,
    create,
    update
}