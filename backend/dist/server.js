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
const upload = (0, multer_1.default)({ dest: 'Images/' });
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/Images', express_1.default.static('Images'));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Image Upload');
}));
app.get('/uploads', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(sqlconfig_1.default);
        const uploads = yield pool.request().query('select * from uploads');
        if (uploads.recordset.length > 0) {
            return res.json({ uploads: uploads.recordset });
        }
        res.json({ message: 'No uploads' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
app.post('/uploads', upload.single('uploaded_file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name } = req.body;
        let pool = yield mssql_1.default.connect(sqlconfig_1.default);
        yield pool.request()
            .input('name', mssql_1.default.VarChar, name)
            .input('image', mssql_1.default.NVarChar, (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename)
            .execute('uploadData');
        res.json({ message: 'Uploaded successfully', name: name, file: req.file });
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
app.listen(process.env.PORT || PORT, () => console.log(`App running on port ${PORT}`));
//# sourceMappingURL=server.js.map