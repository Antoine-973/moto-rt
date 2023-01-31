exports.connection = require('./db')
exports.User = require('./User')
exports.AccountValidationRequest = require('./AccountValidationRequest')
exports.ResetPasswordRequest = require('./ResetPasswordRequest')
exports.Room = require('./Room')
exports.Conversation = require('./Conversation')
exports.Message = require('./Message')

exports.Room.hasMany(exports.Message, { foreignKey: 'roomId', onDelete: 'CASCADE', hooks: true })
exports.Message.belongsTo(exports.Room, { foreignKey: 'roomId' })
exports.User.hasMany(exports.Message, { foreignKey: 'userId', onDelete: 'CASCADE' })
exports.User.hasMany(exports.Conversation, { foreignKey: 'senderId', onDelete: 'CASCADE', hooks: true, as:"sender" })
exports.User.hasMany(exports.Conversation, { foreignKey: 'receiverId', onDelete: 'CASCADE', hooks: true, as:"receiver" })
exports.User.belongsToMany(exports.Room, {
    through: 'user_room',
    as: 'rooms',
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})
exports.Message.belongsTo(exports.User, { foreignKey: 'userId' })
exports.Conversation.belongsTo(exports.User, { foreignKey: 'senderId', as:"sender" })
exports.Conversation.belongsTo(exports.User, { foreignKey: 'receiverId', as:"receiver" })
exports.Conversation.hasMany(exports.Message, { foreignKey: 'conversationId', onDelete: 'CASCADE', hooks: true })
exports.Message.belongsTo(exports.Conversation, { foreignKey: 'conversationId' })
exports.Room.belongsToMany(exports.User, {
    through: 'user_room',
    as: 'users',
    foreignKey: 'roomId',
    onDelete: 'CASCADE'
})