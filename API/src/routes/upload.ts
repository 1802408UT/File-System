import { query, Router } from 'express';
import * as multer from 'multer'
import * as mimeTypes from 'mime-types';
import * as fs from 'fs'
import * as path from 'path'
import * as Loki from 'lokijs'
import { loadCollection, cleanFolder } from '../utils/utils';

// setup
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb) {
        cb(null,Date.now()+"-" + file.originalname + "." + mimeTypes.extension(file.mimetype));
    }
});

const upload = multer({
    storage: storage
 });
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

const router = Router();
////////////////////////////////////
// optional: clean all data before start
//cleanFolder(UPLOAD_PATH);
////////////////////////////////////
router.get('/', async (req, res) => {
    // default route
    res.send(`
        <h1>Files upload Sistem API</h1>
        <ul>
            <li>GET /load   - list all upload files</li>
            <li>GET /load/{id} - get one uploaded file</li>
            <li>POST / - handle single image upload</li>
            <li>POST /photos/upload - handle multiple files upload</li>
        </ul>
    `);
})

router.post('/', upload.single('avatar'), async (req, res) => {
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
        const data = col.insert(req.file);

        db.saveDatabase();
        res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
    } catch (err) {
        res.sendStatus(400);
    }
})

router.post('/photos/upload', upload.array('photos', 12), async (req, res) => {
    try {
        const col = await loadCollection(COLLECTION_NAME, db)
        let data = [].concat(col.insert(req.files));

        db.saveDatabase();
        res.send(data.map(x => ({ id: x.$loki, fileName: x.filename, originalName: x.originalname })));
    } catch (err) {
        res.sendStatus(400);
    }
})

router.get('/load', async (req, res) => {
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
        res.send(col.data);
    } catch (err) {
        res.sendStatus(400);
    }
})

router.get('/load/:id', async (req, res) => {
    
    const a = req.params;
    let id:number = parseInt(a.id);
    
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
        const result = col.get(id);

        if (!result) {
            res.sendStatus(404);
            return;
        };

        res.setHeader('Content-Type', result.mimetype);
        fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
    } catch (err) {
        res.sendStatus(400);
    }
});
router.delete('/delete/:id', async (req, res) => {
    const a = req.params;
    let id:number = parseInt(a.id);
    const col = await loadCollection(COLLECTION_NAME, db);
    var results = col.find({ 'originalname' : { '$contains' : '36495-5-poro-image.png' } });
    //console.log(results);

    //var obj = quizesAnswer.find({id: v.id});
    try {
        const item2 = col.findOne({'filename': {'$aeq': '1629099700811-36495-5-poro-image.png.png'}});
        col.removeDataOnly();
        
        console.log(col.chain().data())
      /* const data = col.chain().find({"$loki":{$aeq:1}}).remove().data();
        col.remove(data);   */
        res.sendStatus(200); 
    } catch (error) {
        res.sendStatus(404);
    }
    

    //const col = await loadCollection(COLLECTION_NAME, db);
      
  
});

export default router;