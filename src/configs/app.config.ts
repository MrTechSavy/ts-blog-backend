interface AppConfig{
    port: string | undefined;
    frontUrl: string | undefined
}

const appConfigs: AppConfig = {
    port: process.env.APP_PORT,
    frontUrl: process.env.FRONT_URL
}

export default appConfigs