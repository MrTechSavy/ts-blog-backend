interface DbConfig{
    url: string | undefined;
}

const dbConfig:DbConfig = {
    url: process.env.DB_URI 
}