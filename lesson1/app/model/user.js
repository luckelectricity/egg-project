module.exports = (app) => {
  const { STRING, INTEGER, ENUM, DATE } = app.Sequelize
  const User = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    email: STRING(255),
    password: STRING(255),
    createdAt: DATE,
    updatedAt: DATE,
    deletedAt: DATE,
    age: INTEGER,
  })
  return User
}
