"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mp3DurationString = exports.slugify = exports.asyncFormParse = void 0;
const multiparty_1 = require("multiparty");
function asyncFormParse(req) {
    return new Promise((resolve, reject) => {
        const form = new multiparty_1.Form();
        form.parse(req, async (err, fields, files) => {
            if (err)
                reject(err);
            resolve({ fields, files });
        });
    });
}
exports.asyncFormParse = asyncFormParse;
function slugify(string) {
    return string.replace(/ /g, "-");
}
exports.slugify = slugify;
async function mp3DurationString(durationInSeconds = 0) {
    let ceiled = Math.ceil(durationInSeconds);
    const minutes = Math.floor(ceiled / 60);
    ceiled -= minutes / 60;
    const seconds = ceiled % 60;
    return `${minutes}:${seconds}`;
}
exports.mp3DurationString = mp3DurationString;
