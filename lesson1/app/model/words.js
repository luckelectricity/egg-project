module.exports = (app) => {
  const { STRING, INTEGER, ENUM, DATE } = app.Sequelize
  const Words = app.model.define('word', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    word: STRING(20),
    mean: STRING(300),
    status: INTEGER,
    grade: INTEGER,
    remark: STRING(300),
    createTime: DATE,
    updateTime: DATE,
  })
  return Words
}
