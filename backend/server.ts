import express from 'express'
import cors from 'cors'
import multer from 'multer'
import mssql from 'mssql'
import sqlConfig from './config/sqlconfig'

const app = express()

const PORT = 4000
const upload = multer({dest: 'Images/'})

app.use(express.json())
app.use(cors())
app.use('/Images', express.static('Images'))

app.get('/', async(req, res) => {
    res.send('Image Upload')
})

app.get('/uploads', async(req, res) => {
    try {
        let pool = await mssql.connect(sqlConfig)
        const uploads = await pool.request().query('select * from uploads')
        if (uploads.recordset.length > 0) {
            return res.json({uploads: uploads.recordset})
        }
        res.json({message: 'No uploads'})
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
        .input('image', mssql.NVarChar, req.file?.filename)
        .execute('uploadData')

        res.json({message: 'Uploaded successfully', name: name, file: req.file})        
    } catch (error: any) {
        res.json({error: error.message})
    }
})

app.listen(process.env.PORT || PORT, () => console.log(`App running on port ${PORT}`))