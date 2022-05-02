module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    age: INTEGER,
    pwd: STRING(255),
    phone: STRING(15),
    avatar: TEXT('long'),
    sign: STRING(300),
    createTime: DATE,
    updateTime: DATE,
  })
  return User
}
