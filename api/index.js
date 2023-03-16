//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const PORT = 3001;
const { conn } = require('./src/db.js');
const saveApiData = require('./src/controllers/saveApiData');

// Syncing database
conn.sync({ force: false }).then( async () => {

   console.log('DB connected');
   console.time('DB load time'); // Start the timer
   await saveApiData(); // precargo en la DB todas las diets disponibles
   console.timeEnd('DB load time'); // End the timer and log the elapsed time
   console.log('DB loaded');
   
   server.listen(PORT, () => {
      console.log('Server raised on port ' + PORT);
   })
}).catch((error) => {
   console.error(error);
});
