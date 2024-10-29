interface JwtConfig{
    secret: string
}

const jwtConfig : JwtConfig = {
    secret: process.env.JWT_SECRET || "MySUperSecret"
}

export default jwtConfig