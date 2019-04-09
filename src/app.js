import 'babel-polyfill';
import Time from './script';
import './main.scss';

const clock = new Time(24);
const clock2 = new Time(12);
clock.start();
clock2.start();
