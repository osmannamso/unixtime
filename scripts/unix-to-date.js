const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);

const unixForm = document.getElementById('unix-form');
const unixInputEl = document.getElementById('unixtime');
const currentTimestampEl = document.getElementById('current-timestamp');
const copyTextEl = document.getElementById('copy-text');

const setDates = (unixtime) => {
    let timeFormat = 'seconds';
    if (unixtime.length > 11) {
        unixtime /= 1000;
        timeFormat = 'milliseconds';
    }
    const format = 'ddd LL, LTS';

    const date = moment.unix(unixtime);
    const localDate = date.format(format);
    const utcDate = date.utc().format(format);
    const fromNow = date.fromNow();

    const timeFormatEl = document.getElementById('format');
    timeFormatEl.textContent = timeFormat;
    const yourTimeZoneEl = document.getElementById('your-time-zone');
    yourTimeZoneEl.textContent = localDate;
    const utcTimeZoneEl = document.getElementById('utc-time-zone');
    utcTimeZoneEl.textContent = utcDate;
    const relativeTimeEl = document.getElementById('relative-time');
    relativeTimeEl.textContent = fromNow;
};

const copyCurrentTime = () => {
    const range = document.createRange();
    range.selectNode(currentTimestampEl);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    copyTextEl.textContent = 'Copied!';
    setTimeout(() => {
        copyTextEl.textContent = 'Click to copy';
    }, 700);
};

const now = moment().unix();
setDates(now);
currentTimestampEl.textContent = now;

setInterval(() => {
    currentTimestampEl.textContent = moment().unix();
}, 1000);

currentTimestampEl.addEventListener('click', () => {
    copyCurrentTime();
});

unixForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const unixtime = unixInputEl.value;
    if (!unixtime) {
        return;
    }

    setDates(unixtime);
});
