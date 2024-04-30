const {get_note, get_img} = require('./hackmd.js');
const {save_note, save_img, create_dir} = require('./files.js');


async function download(url, title, post_dir, img_dir, hackmd_token){
    // create dir
    create_dir(post_dir);
    create_dir(img_dir);

    // match image url with regex
    const regex = /\!\[([^)]+)\]\((https:\/\/hackmd\.io\/_uploads\/[^\)]+)\)/;
    let note = await get_note(url, hackmd_token);
    let new_note = '';
    let match, img_data, img_path, img_name, img_url, img_extension;

    // simillar to replaceAsync(note, regex, async)
    while (match = regex.exec(note)) {
        img_name = match[1].replace(' ', '-');
        img_url = match[2];
        img_extension = img_url.split('.').pop();
        img_path = `${img_dir}/${img_name}.${img_extension}`;

        img_data = await get_img(img_url, hackmd_token); // async
        save_img(img_data, img_path) // async

        new_note = new_note + note.slice(0, match.index) + `![${img_name}](/${img_path.slice(7)})`;
        note = note.slice(match.index + match[0].length);
    };

    new_note += note;
    save_note(new_note, `${post_dir}/${title}.md`)
}


module.exports = download;