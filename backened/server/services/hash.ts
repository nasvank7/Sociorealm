import bcrypt from 'bcrypt'

export const hashedPassword=async(password:string)=>{
    const saltRounds=10
    const hash=await bcrypt.hash(password,saltRounds)
    return hash
}

export const comparePassword=async(
    password:string,
    hashedPassword:string
)=>{
    const validPassword=bcrypt.compare(password,hashedPassword);
    return validPassword
}