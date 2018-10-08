/**
 * Prints out and handles error messages
 * Flushes error stack
 */

module.exports = function () {
    return function (err, req, res, next) {
        // Flush out the stack to the console
        res.tpl.error.forEach(function (error) {
            console.error('[OWN] ' + error);
        });

        if(typeof err !== 'undefined' && err.stack != null) {
            console.error('[ERROR] ' + err.message);
            console.error('[---------------------Stack---------------------]');
            console.error(err.stack);
            console.error('[-----------------------------------------------]');
        }

        res.tpl.error.push(err.message);

        var message = '<pre>req.params:\n' + JSON.stringify(req.params, null, 4)
        + '\n\nreq.body:\n' + JSON.stringify(req.body, null, 4)
        + '\n\nres.tpl:\n' + JSON.stringify(res.tpl, null, 4)
        + '</pre>';

        return res.status(400).send(message);
    }
}
