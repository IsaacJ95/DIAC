module.exports = function (req, res, next) {
    if (req.fullUser && req.fullUser.Role.nameRol === 'Admin') return next()

    next(new Error('No tienes permisos para realizar esta acción'))
}