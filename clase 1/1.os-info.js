const os = require('node:os');

const cl = (s) => console.log(s);

cl('Información del Sistema Operativo');
cl('---------------------------------');

cl('Nombre del SO');
cl(os.platform());
cl('Versión del SO');
cl(os.release());
cl('Arquitectura');
cl(os.arch());
cl('CPUs');
cl(os.cpus());
cl('Memoria Libre');
cl(os.freemem() / 1024 / 1024);
cl('Memoria Total');
cl(os.totalmem() / 1024 / 1024);
cl('Uptime');
cl(os.uptime() / 60 / 60 / 24);
