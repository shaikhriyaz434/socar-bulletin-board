const multiparty = require('multiparty');
const path = require('path');
const fileConfig = require('config').get('FILE_SERVER');
class FileController {

    constructor() {

    }

    uploadFiles(req, res) {
        let form = new multiparty.Form({
            autoFields: true,
            autoFiles: true,
            uploadDir: path.join(fileConfig.OUT_DIR)
        });

        form.parse(req, function (err, fields, files) {
            if (err) {
                return res.status(401).json({ error: [err] })
            } else {
                let result = [];
                Object.keys(files).forEach(function (key) {
                    result.push({
                        url: fileConfig.HOST  + path.basename(files[key][0].path),
                        fileName: files[key][0].originalFilename,
                        fieldName: files[key][0].fieldName
                    });
                })
                return res.json({ msg: "files recieved", files, result });
            }
        })



    }

}

module.exports = new FileController();