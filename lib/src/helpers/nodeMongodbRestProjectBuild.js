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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var ora_1 = __importDefault(require("ora"));
var path_1 = __importDefault(require("path"));
var index_1 = require("../utils/index");
function default_1(_a) {
    var folderName = _a.folderName, projectName = _a.projectName, useTypeScript = _a.useTypeScript, packageManager = _a.packageManager, spinner = _a.spinner;
    return __awaiter(this, void 0, void 0, function () {
        var destination, packageManagerShellCmd, asDev, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    spinner = ora_1.default({
                        color: "green",
                        text: "Generating your node mongodb rest api boilerplate setup ...",
                    }).start();
                    destination = folderName;
                    packageManagerShellCmd = packageManager === "npm"
                        ? "npm i"
                        : packageManager === "yarn"
                            ? "yarn add"
                            : "npm i";
                    asDev = packageManager === "npm"
                        ? "--save-dev"
                        : packageManager === "yarn"
                            ? "-D"
                            : "--save-dev";
                    if (folderName !== "." && fs_extra_1.default.existsSync(folderName)) {
                        spinner === null || spinner === void 0 ? void 0 : spinner.fail(chalk_1.default.red("Can't create a new project as the folder already exists 😢"));
                        process.exit(1);
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    if (!!useTypeScript) return [3 /*break*/, 3];
                    return [4 /*yield*/, generateNodeMongoRestBoilerplate({
                            asDev: asDev,
                            folderName: folderName,
                            packageManagerShellCmd: packageManagerShellCmd,
                            packageManager: packageManager,
                            destination: destination,
                            projectName: projectName,
                            spinner: spinner,
                        })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, generateNodeMongoRestTSBoilerplate({
                        asDev: asDev,
                        folderName: folderName,
                        packageManagerShellCmd: packageManagerShellCmd,
                        packageManager: packageManager,
                        destination: destination,
                        projectName: projectName,
                        spinner: spinner,
                    })];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _b.sent();
                    console.error(err_1);
                    spinner === null || spinner === void 0 ? void 0 : spinner.fail(chalk_1.default.red("Failed to generate your node app 😢"));
                    process.exit(1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.default = default_1;
function generateNodeMongoRestBoilerplate(_a) {
    var asDev = _a.asDev, folderName = _a.folderName, packageManagerShellCmd = _a.packageManagerShellCmd, packageManager = _a.packageManager, destination = _a.destination, projectName = _a.projectName, spinner = _a.spinner;
    return __awaiter(this, void 0, void 0, function () {
        var source;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    source = path_1.default.join(__dirname, "..", "..", "examples", "node-mongodb-api");
                    return [4 /*yield*/, fs_extra_1.default.copy(source, destination)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, index_1.execShellCommand("cd " + folderName + " && " + packageManagerShellCmd + " cors dotenv esm express helmet morgan mongoose")];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, index_1.execShellCommand("cd " + folderName + " && " + packageManagerShellCmd + " eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise nodemon " + asDev)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, index_1.execShellCommand("cd " + folderName + " && " + packageManager + " install")];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, index_1.writeToPackageJSON({ folderName: folderName, projectName: projectName })];
                case 5:
                    _b.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.succeed("All set 👌");
                    return [2 /*return*/];
            }
        });
    });
}
function generateNodeMongoRestTSBoilerplate(_a) {
    var asDev = _a.asDev, folderName = _a.folderName, packageManagerShellCmd = _a.packageManagerShellCmd, packageManager = _a.packageManager, destination = _a.destination, projectName = _a.projectName, spinner = _a.spinner;
    return __awaiter(this, void 0, void 0, function () {
        var source;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    source = path_1.default.join(__dirname, "..", "..", "examples", "node-mongodb-api-ts");
                    return [4 /*yield*/, fs_extra_1.default.copy(source, destination)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, index_1.execShellCommand("cd " + folderName + " && " + packageManagerShellCmd + " cors dotenv express helmet morgan mongoose")];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, index_1.execShellCommand("cd " + folderName + " && " + packageManagerShellCmd + " " + asDev + " typescript @types/node ts-node @types/cors @types/express @types/mongoose @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise nodemon")];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, index_1.execShellCommand("cd " + folderName + " && " + packageManager + " install")];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, index_1.writeToPackageJSON({ folderName: folderName, projectName: projectName })];
                case 5:
                    _b.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.succeed("All set 👌");
                    return [2 /*return*/];
            }
        });
    });
}
