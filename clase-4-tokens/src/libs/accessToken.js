import jwt from "jsonwebtoken";
export const getAccessToken = (id) => {
    return new Promise((resolve, reject)=>{
        jwt.sign(
            { id: id },
            process.env.SECRET_KEY_TOKEN,
            { expiresIn: "1h" },
            (error, token) => {
              if(error) return reject(error)
              resolve(token)
            }
          );
    })
}





