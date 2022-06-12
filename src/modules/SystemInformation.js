import os from 'os';

const getSystemInformation = (flag) => {
  if (!flag) {
    console.log('\nYou need to choose what information about the operating system you want to receive(--EOL, --cpus, --homedir, --username or --architecture). Try again\n');
    return;
  }

  switch (flag) {
    case '--EOL':
      const eol = os.EOL;
      console.log('EOL: ', JSON.stringify(eol));     
      break;
    case '--cpus':
      const CPUsArr = [];
      os.cpus().forEach(cpu => {
        const speed = `${(cpu.speed / 1000).toFixed(2)} GHz`;
        CPUsArr.push({ model: cpu.model, speed: speed})
      });

      console.log(`Total CPUs: ${CPUsArr.length}`);
      console.log(CPUsArr);
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
    default: console.log(new Error(`\nOperation failed\n`));
  }
  console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter ".exit" or press Ctrl + C)\n`);
};

export {getSystemInformation};
