"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const mssql_1 = __importDefault(require("mssql"));
const sqlconfig_1 = __importDefault(require("./config/sqlconfig"));
const app = (0, express_1.default)();
const PORT = 4000;
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Image Upload');
}));
app.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(sqlconfig_1.default);
        const images = yield pool.request().query('select * from uploads');
        if (images.recordset.length > 0) {
            return res.json({ images: images.recordset });
        }
        res.json({ message: 'No images uploaded' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
app.post('/uploads', upload.single('uploaded_file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.file);
    try {
        let pool = yield mssql_1.default.connect(sqlconfig_1.default);
        yield pool.request().query(`insert into uploads(image)values('${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname}')`);
        res.json({ message: 'Image uploaded successfully', file: req.file });
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
app.listen(process.env.PORT || PORT, () => console.log(`App running on port ${PORT}`));
//# sourceMappingURL=server.js.map