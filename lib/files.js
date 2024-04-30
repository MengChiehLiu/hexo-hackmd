const fs = require('fs');


function save_note(note, note_path){
    fs.writeFileSync(note_path, note);
}

async function save_img(img_data, img_path){
    const writer = fs.createWriteStream(img_path);
    img_data.pipe(writer);
}

function create_dir(dir){
    fs.mkdirSync(dir, { recursive: true });
}

module.exports = {save_note, save_img, create_dir};

