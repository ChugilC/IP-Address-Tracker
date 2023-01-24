const mapEl = document.getElementById('map');
const inputEl = document.getElementById('address');
const btn = document.getElementById('btn');
const ipEL = document.getElementById('ip');
const locationsEL = document.getElementById('location');
const timezoneEL = document.getElementById('timezone');
const ispEL = document.getElementById('isp');

let mapCords = {
  center: [40.6782, -73.949997],
  zoom: 13,
};

let map = L.map('map', mapCords);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let marker = L.marker(mapCords.center).addTo(map);

const findLocation = async (address) => {
  const res = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_S01pTix66v2DBhv0IcIsxBuwmtX2b&ipAddress=${address}`
  );
  const data = await res.json();

  const {
    ip,
    isp,
    location: { timezone, region, lat, lng },
  } = data;

  ipEL.innerText = ip;
  locationsEL.innerText = region;
  timezoneEL.innerText = 'UTC' + timezone;
  ispEL.innerText = isp;

  map.panTo([lat, lng]);
  L.marker([lat, lng]).addTo(map);
};

btn.addEventListener('click', () => {
  const ipAddress = inputEl.value;

  if (ipAddress.length == 0) {
    alert('Enter valid input');
  } else {
    findLocation(ipAddress);
  }
});
