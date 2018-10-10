// ** Common functions used through the project

/**
 * Load a dependency from an object repository
 * @param objectRepository object repository
 * @param propertyName dependency name
 * @returns {*}
 */
function requireOption(objectRepository, propertyName) {
    if (objectRepository && objectRepository[propertyName]) {
        return objectRepository[propertyName];
    }
    //throw new TypeError(propertyName + ' required');
    console.log('TypeError (' + propertyName + ' required)');
}

function multiLine(string) {
    while (string.indexOf("\r\n") !== -1) {
        string = string.replace("\r\n", "<br/>");
    }

    return string;
}

function answer(route){
    return function(req, res, next){
        return res.send(res.tpl);

        var message = "<pre>" + route
        + "\n\nreq.session:\n" + JSON.stringify(req.session, null, 4)
        + "\n\nreq.params:\n" + JSON.stringify(req.params, null, 4)
        + "\n\nreq.body:\n" + JSON.stringify(req.body, null, 4)
        + "\n\nres.tpl:\n" + JSON.stringify(res.tpl, null, 4)
        + "</pre>";

        if(res.tpl.error.length > 0){
            return res.status(500).send('Houston, we had a problem!');
        } else {
            return res.send(message);
        }
    }
}

module.exports.requireOption = requireOption;
module.exports.multiLine = multiLine;
module.exports.answer = answer;
