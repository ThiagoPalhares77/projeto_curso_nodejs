//dependências do projeto
// npm install init
//npm install express
//npm install nodemon
//npm install ejs

//importando express
const express= require('express')
//const noticias = require('./mockup.js')

const db=require('./dbConnection')
const port= process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extend:true}))

app.set('view engine','ejs')
app.use(express.static('./views/public'))

// criando primeira rota
app.get('/', async (req,res) =>{
    var result= await db.query('SELECT *FROM noticias ORDER BY id_noticia DESC LIMIT 3')
    res.render('home/index',{noticias:result.rows,title:'Home'})
})

//noticias
app.get('/noticias',async (req,res) =>{
    var result= await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC')
    res.render('noticias/noticias',{noticias:result.rows, title:'Noticias'})
})

// noticia
app.get('/noticia', async (req,res) =>{
    //recuperar id por get
    var id= req.query.id
    let result= await db.query('SELECT * FROM noticias WHERE id_noticia=$1',[id])
    res.render('noticias/noticia',{noticia:result.rows[0],title:'Noticia'})
})
//rota admin
app.get('/admin',(req,res) =>{
    res.render('admin/form_add_noticia',{title:'Formulário'})
})

//rota responsável por salvar a notícia
app.post('/admin/salvar-noticia', async(req,res) => {
    // recuperar clientInformationcao pelo método post
    let{titulo,conteudo}= req.body
    await db.query('INSERT INTO noticias(titulo,conteudo)VALUES($1,$2)',[titulo,conteudo],(err, result)=>{
        res.redirect('/noticias')
    })
})


app.listen(port,() =>{
    console.log('Escutando na porta 3000 com Express')
   
})

