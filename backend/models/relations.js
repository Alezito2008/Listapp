const Amigos = require("./Amigos");
const Usuario = require("./Usuarios");

Usuario.belongsToMany(Usuario, {
    as: 'amigos',
    through: Amigos,
    foreignKey: 'userId',
    otherKey: 'amigoId',
    onDelete: 'CASCADE'
})
