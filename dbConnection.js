const {Pool}= require('pg')

const client= new Pool({
    connectionString: process.env.DATABASE_URL ||'postgres://izjnrvttqmsrnx:cf8623cb32565b5dc413dadbcecf4f703bf7864bcfabf525051d1892b5e0c77c@ec2-3-211-6-217.compute-1.amazonaws.com:5432/dd87l6hq74h614',
    ssl:{
        rejectUnauthorized:false
    }
})

//teste de conexao
// async function connectTeste(){
//     const res= await client.query ('SELECT $1::text as message',['Olá mundo'],
//     (err,result) =>{
//         console.log(result.rows[0].message)

//     })
// }

// connectTeste()

module.exports=client