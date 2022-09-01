import express from 'express'
import cors from 'cors'
import multer from 'multer'
import mssql from 'mssql'
import sqlConfig from './config/sqlconfig'

const app = express()

const PORT = 4000
const upload = multer({dest: 'uploads/'})

app.use(express.json())
app.use(cors())

app.get('/', async(req, res) => {
    res.send('Image Upload')
})

app.get('/images', async(req, res) => {
    try {
        let pool = await mssql.connect(sqlConfig)
        const images = await pool.request().query('select * from uploads')
        if (images.recordset.length > 0) {
            return res.json({images: images.recordset})
        }
        res.json({message: 'No images uploaded'})
    } catch (error: any) {
        res.json({error: error.message})
    }

})

app.post('/uploads', upload.single('uploaded_file'), async(req, res) => {
    try {
        const { name } = req.body as { name:string }

        let pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input('name', mssql.VarChar, name)
        .input('image', mssql.NVarChar, req.file?.originalname)
        .execute('uploadData')

        res.json({message: 'Uploaded successfully', name: name, file: req.file})        
    } catch (error: any) {
        res.json({error: error.message})
    }
})

app.listen(process.env.PORT || PORT, () => console.log(`App running on port ${PORT}`))