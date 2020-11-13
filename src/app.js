const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geourl = require('./utils/geocode')
const forcast = require('./utils/forcast')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views loacation
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Vikash kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
       title:'About Me',
        name:'Vikash kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'your help message print',
        name:'Vikash kumar '
    })
})

// app.get('',(req,res)=>{
//     res.send('welcome Express!')
// })

// app.get('/help',(req,res)=>{
//     res.send('This is help page')
// })

// app.get('/about',(req,res)=>{
//     res.send('About')
// })

app.get('/weather',(req,res)=>{
if(!req.query.address){
   return res.send({
        error:'You must provide an address'
    })
}

    geourl(req.query.address,(error,{latitude,longitude}={})=>{
      if(error){
          return res.send({error})
      }

      forcast(latitude,longitude,(error,forecastData)=>{
          if(error){
              return res.send({error})
          }

          res.send({
              forcast:forecastData,
              address:req.query.address
        })
      })
    })

    // res.send({
    //     forcast:'it is snowing',
    //     location:'Philadelphia',
    //     address:req.query.address
    // })

})



app.get('/product',(req,res)=>{
    if(!req.query.search){
      return  res.send({
            error:'You must provide a search term'
        })
    }
     
    console.log(req.query.search)
    res.send({
       products:[] 
    })
})



app.get('/help/*',(req,res)=>{
   res.render('404',{
       title: '404',
       name: 'Vikash kumar',
       errorMessage: 'help article not found'
   })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Vikash kumar',
        errorMessage:'Page not found'
    })
})



app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})