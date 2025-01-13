interface DBConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
    use_env_variable?: string;
  }
  
  export const dbConfig: { [key: string]: DBConfig } = {
    development: {
      username: 'lepley',
      password: 'root',
      database: 'emnc',
      host: 'localhost',
      dialect: 'mysql',
    },
    test: {
      username: 'lepley',
      password: 'root',
      database: 'emnc',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    production: {
      username: 'lepley',
      password: 'root',
      database: 'emnc',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
  };
  