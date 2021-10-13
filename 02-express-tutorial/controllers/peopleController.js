const { people } = require("../data");

const getPeople = (req, res) => {
    console.log("In GET request", req.body);
    res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
    console.log("In POST request", req.body);

    const { id } = req.body;

    if (!id) {
        return res
            .status(401)
            .json({ success: false, msg: "Please enter valid ID and NAME" });
    }
    res.status(200).json({ status: true, data: [...people, req.body] });
};

const updatePerson = (req, res) => {
    const { name } = req.body;
    const { changeId } = req.params;

    const newPeople = people.map((person) => {
        if (person.id === Number(changeId)) {
            person.name = name;
            return person;
        }
        return person;
    });
    console.log("New people", newPeople);

    console.log("IN PUT Request", req.body, req.params);

    if (!name) {
        return res
            .status(401)
            .json({ success: false, msg: "Please enter valid ID" });
    }
    res.status(200).json({ status: true, data: newPeople });
};

const deletePerson = (req, res) => {
    //  const { name } = req.body;
    const { changeId } = req.params;
    const person = people.find((person) => person.id === Number(changeId));

    console.log(person, changeId);
    if (!person) {
        return res
            .status(401)
            .json({ success: false, msg: "Please enter valid ID" });
    }
    const newPeople = people.filter((person) => person.id !== Number(changeId));
    res.status(200).json({ status: true, data: newPeople });
};

module.exports = {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson,
};