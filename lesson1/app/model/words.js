module.exports = (app) => {
  const { STRING, INTEGER, ENUM, DATE } = app.Sequelize
  const Words = app.model.define('words', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    word: STRING(255),
    status: INTEGER,
    grade: INTEGER,
    remark: STRING(255),
    createdAt: DATE,
    updatedAt: DATE,
    deletedAt: DATE,
  })
  return Words
}
