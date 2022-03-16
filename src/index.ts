const a = 333

import '@/main.css';

// import './main2.scss';

// import './main3.less';

import { aa } from '@/xx'

console.log(aa);


const img1 = require('./static/1.jpeg')

const imgDom = document.createElement('img')

imgDom.src = img1

document.body.appendChild(imgDom)
