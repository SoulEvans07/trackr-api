const StateEnum = {
    type: String,
    enum: ["OPEN", "IN_PROGRESS", "DONE"],
    default: "OPEN"
};

module.exports = StateEnum;