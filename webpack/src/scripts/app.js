import data from './data';
import { multiply } from './utils';

import '../styles/main.scss';
import prudenceImg from '../images/prudence.jpg';
import webpackImg from '../images/webpack.jpg';

const app = document.getElementById('app');
app.innerHTML = `
<p>${data.greeting} ${data.location}</p>
<p>3 * 3 = ${multiply(3, 3)}</p>
<div><img src=${prudenceImg} alt="doge" /></div>
<div><img src=${webpackImg} alt="logo" /></div>
`;

// must exist in entry file
if (module.hot) {
  module.hot.accept();
}
