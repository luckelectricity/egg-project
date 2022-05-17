module.exports = (app) => {
  const { STRING, INTEGER, ENUM, DATE, TEXT } = app.Sequelize
  const Words = app.model.define('word', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    word: STRING(20),
    mean: STRING(300),
    status: INTEGER,
    grade: INTEGER,
    remark: STRING(300),
    zhTrans: TEXT,
    enTrans: TEXT,
    createTime: DATE,
    updateTime: DATE,
  })
  return Words
}
