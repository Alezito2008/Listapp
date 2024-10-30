const Amigos = require("./Amigos");
const Grupos = require("./Grupos");
const Usuario = require("./Usuarios");

Usuario.belongsToMany(Usuario, {
    as: 'amigos',
    through: Amigos,
    foreignKey: 'userId',
    otherKey: 'amigoId',
    onDelete: 'CASCADE'
})

Grupos.belongsTo(Usuario, {
    foreignKey: 'creadorId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
})
