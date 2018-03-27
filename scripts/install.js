const shell = require('shelljs');

['01', '02', '03', '04', '05', '06', '07', '08'].forEach(dir => {
  shell.cd(`${dir}/${dir}-exercise`);
  shell.echo(`\nInstalling exercise ${dir}:`);
  shell.exec(`yarn`);
  shell.cd('../..');
});
