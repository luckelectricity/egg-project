module.exports = (appInfo) => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1645685314071_8595'

  // add your middleware config here
  config.middleware = []
  config.sequelize = {
    dialect: 'mysql',
    database: 'memorize_words',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    // 中国时区
    timezone: '+08:00',
    define: {
      // 取消数据表名复数
      freezeTableName: true, // 锁定表名 不加S
      timestamps: false, // 字段生成软删除时间戳 deleted_at
      // paranoid: true,
      // createdAt: 'created_at',
      // updatedAt: 'updated_at',
      // underscored: true,
    },
  }

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '123456',
      db: 0,
    },
    expires: 60 * 60 * 24, // 过期时间，单位：秒
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
    expiresIn: 1000 * 60 * 60 * 24 * 7, // token 过期时间
  }

  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true,
  }

  config.multipart = {
    mode: 'file',
  }

  config.ejs = {}

  config.auth = {
    exclude: ['/api/user/login', '/api/user/register'],
  }

  config.baiduTransUrl = 'https://fanyi-api.baidu.com/api/trans/vip/translate'

  config.transQuery = {
    from: 'en',
    to: 'zh',
    appid: '20220406001160939',
    salt: 'swfxueyingyu',
    miyao: 'P199Kf1zSfkFsUAgVaDv',
  }

  // add your user config here
  const userConfig = {
    salt: '1q2w3e4r5T@!',
  }

  return {
    ...config,
    ...userConfig,
  }
}
