module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize
  const application = app.model.define('ocean_applications', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(100),
    appBaseUrl: STRING(100),
    description: STRING(100),
  })
  return application
}
