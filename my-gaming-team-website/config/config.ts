import dotenv from 'dotenv'

dotenv.config();

export interface Config {
    PORT: number;
    MONGO_URI: string; 
    JWT_SECRET: string;
}


const getEnvVar = (key: keyof Config, defaultValue?: string | number) => {
    const value = process.env[key];
    if(!value && defaultValue === undefined) {
        throw new Error(`Missing environment variable: ${key}`)
    }
    return value || defaultValue!;
}


export const config: Config = {
    PORT: parseInt(getEnvVar('PORT', 5000) as string, 10),
    MONGO_URI: getEnvVar('MONGO_URI') as string,
    JWT_SECRET: getEnvVar('JWT_SECRET') as string,

}