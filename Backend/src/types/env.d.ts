declare namespace NodeJS {
    interface ProcessEnv {
        GOOGLE_CLIENT_ID: string,
        GOOGLE_CLIENT_SECRET: string,
        GOOGLE_REDIRECT_URI: string,
        JWT_SECRET: string,
        MONGO_URL: string,
        GEMINI_API_KEY: string,
        AWS_ACCESS_KEY_ID: string,
        AWS_SECRET_ACCESS_KEY: string,
        AWS_REGION: string,
        S3_BUCKET_NAME: string,
        OPENCAGE_API_KEY:string
}
}