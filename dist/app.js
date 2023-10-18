"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
app.use(express_1.default.static('./src/public'));
app.use('/scrape', router_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000);
