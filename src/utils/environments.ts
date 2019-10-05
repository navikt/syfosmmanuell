class Environment {
    get nodeEnv() {
        return process.env.NODE_ENV;
    }

    get isProduction() {
        return this.nodeEnv === 'production';
    }

    get isPreprod() {
        return this.nodeEnv === 'preprod';
    }

    get isDevelopment() {
        return this.nodeEnv === 'development';
    }
}

const env = new Environment();

export default env;