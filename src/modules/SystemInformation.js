// os --EOL
// os --cpus
// os --homedir
// os --username
// os --architecture

import os from 'os';

const getSystemInformation = (flag) => {
  if (!flag) {
    console.log(new Error('\nYou need to choose what information about the operating system you want to receive(--EOL, --cpus, --homedir, --username or --architecture). Try again\n'));
    return;
  }

  switch (flag) {
    case '--EOL':
      //как вывести перенос строки в консоль
      const charCode = os.EOL.charCodeAt();
      if (charCode === 10) {
        console.log('EOL: ', '\\n');
      } else if (charCode === 13) {
        console.log('EOL: ', '\\r\\n');
      }      
      break;
    case '--cpus':
      const CPUsArr = [];
      os.cpus().forEach(cpu => {
        if (!CPUsArr.includes(cpu.model)) {
          CPUsArr.push(cpu.model)
        }
      });

      console.log(`Total processors: ${CPUsArr.length}\n${CPUsArr.splice('/n')}`);
      break;
    case '--homedir':
      console.log('Home directory: ', os.homedir());
      break;
    case '--username':
      console.log('System user name: ', os.userInfo().username);
      break;
    case '--architecture':
      console.log('CPU architecture: ', os.arch());
      break;
    default: console.log('Invalid input');
  }

};

export {getSystemInformation};
