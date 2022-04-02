module.exports = (appInfo) => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1645685314071_8595'

  // add your middleware config here
  config.middleware = []
  config.sequelize = {
    dialect: 'mysql',
    database: 'user',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    // 中国时区
    timezone: '+08:00',
    define: {
      // 取消数据表名复数
      freezeTableName: true, // 自动写入时间戳 created_at updated_at
      timestamps: true, // 字段生成软删除时间戳 deleted_at
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
    },
  }

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  }
  config.security = {
    csrf: {
      enable: false,
    },
  }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }
  config.jwt = {
    secret: '1q2w3e4r5T@!', //自定义 token 的加密条件字符串
  }

  config.multipart = {
    mode: 'file',
  }

  config.ejs = {}

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}
