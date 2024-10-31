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

Grupos.belongsToMany(Usuario, {
    through: 'miembros',
    onDelete: 'CASCADE'
})

Usuario.belongsToMany(Grupos, {
    through: 'miembros',
    onDelete: 'CASCADE'
})
