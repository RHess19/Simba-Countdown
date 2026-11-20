const hamburgerButton = document.getElementById('hamburgerMenu');
const sidebarMenu = document.getElementById('sidebarMenu');

function toggleMenu()
{
	sidebarMenu.classList.toggle('open');
}

if(hamburgerButton && sidebarMenu)
{
	hamburgerButton.addEventListener('click', toggleMenu);
}

const pageContainer = document.querySelector('.page-container');

document.addEventListener('click', (event) => {
	const isClickInsideSidebar = sidebarMenu.contains(event.target);
	const isClickOnHamburger = hamburgerButton.contains(event.target);

	if(sidebarMenu.classList.contains('open') && !isClickInsideSidebar && !isClickOnHamburger)
	{
		toggleMenu();
	}
});

const HANUKKAH_START = new Date(2026, 11, 5); // months are 0-indexed: 11 = December
const TOTAL_NIGHTS = 8;
const STORAGE_PREFIX = 'echoHannukah2026-night-';
const dailyImage = (day) => `./media/echos/${day}.jpg`;

const params = new URLSearchParams(window.location.search);

// Testing: ?reset clears saved progress, ?night=N pretends it's night N (0-8)
if(params.has('reset'))
{
	try
	{
		for(let n = 0; n <= TOTAL_NIGHTS; n++)
		{
			localStorage.removeItem(STORAGE_PREFIX + n);
		}
	}
	catch(e) {}
}

function getCurrentNight()
{
	const override = parseInt(params.get('night'));
	if(!isNaN(override))
	{
		return Math.max(0, Math.min(override, TOTAL_NIGHTS));
	}

	const now = new Date();
	const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const msPerDay = 24 * 60 * 60 * 1000;
	// Math.round absorbs the 23/25-hour days around daylight saving changes
	const night = Math.round((todayMidnight - HANUKKAH_START) / msPerDay) + 1;

	// Before 12/5 -> 0 (only the helper candle); after 12/12 -> stays at 8
	return Math.max(0, Math.min(night, TOTAL_NIGHTS));
}

const night = getCurrentNight();
const storageKey = STORAGE_PREFIX + night;

// Candles present tonight are data-day 2..(night + 1).
// Left to right means highest data-day first: night + 1, night, ..., 2.
const lightOrder = [];
if(night >= 1)
{
	lightOrder.push(1);
	for(let day = night + 1; day >= 2; day--)
	{
		lightOrder.push(day);
	}
}

function loadProgress()
{
	try
	{
		const saved = parseInt(localStorage.getItem(storageKey));
		return isNaN(saved) ? 0 : Math.min(saved, lightOrder.length);
	}
	catch(e)
	{
		return 0;
	}
}

function saveProgress()
{
	try
	{
		localStorage.setItem(storageKey, litCount);
	}
	catch(e) {}
}

let litCount = loadProgress();

const candles = document.querySelectorAll('.candle');

function render()
{
	candles.forEach((candle) => {
		const day = parseInt(candle.dataset.day);
		const isLitImage = candle.classList.contains('lit-candle');

		const index = lightOrder.indexOf(day);
		const existsTonight = (day === 1) || index !== -1; // the helper is always on the menorah
		const isLit = index !== -1 && index < litCount;
		const visible = existsTonight && (isLitImage ? isLit : !isLit);

		candle.classList.toggle('hidden', !visible);
	});
}

function shake(candle)
{
	candle.classList.remove('shake');
	void candle.offsetWidth; // restart the animation if it's already running
	candle.classList.add('shake');
	candle.addEventListener('animationend', () => candle.classList.remove('shake'), { once: true });
}

const popup = document.getElementById('popup');
const popupImage = document.getElementById('popupImage');
const galleryPopup = document.getElementById('galleryPopup');
const galleryGrid = document.getElementById('galleryGrid');
const galleryButton = document.getElementById('galleryButton');

function showDailyImage(day)
{
	popupImage.src = dailyImage(day);
	popupImage.alt = `Day ${day} of Hannukah`;
	popup.classList.add('open');
}

// Every previous day, plus tonight once its menorah is fully lit (newest first)
function getUnlockedDays()
{
	const lastDay = (night >= 1 && litCount === lightOrder.length) ? night : night - 1;
	const days = [];

	for(let day = lastDay; day >= 1; day--)
	{
		days.push(day);
	}

	return days;
}

function renderGallery()
{
	galleryGrid.innerHTML = '';
	const days = getUnlockedDays();

	if(days.length === 0)
	{
		const message = document.createElement('p');
		message.className = 'gallery-empty';
		message.textContent = night === 0
			? 'Check back once Hannukah begins!'
			: "Light the menorah to unlock today's picture!";
		galleryGrid.appendChild(message);
		return;
	}

	days.forEach((day) => {
		const item = document.createElement('button');
		item.className = 'gallery-item';
		item.innerHTML = `<img src="${dailyImage(day)}" alt="Day ${day}"><span>Day ${day}</span>`;
		item.addEventListener('click', () => showDailyImage(day));
		galleryGrid.appendChild(item);
	});
}

galleryButton.addEventListener('click', () => {
	renderGallery(); // rebuilt each time so a just-lit menorah unlocks today's image
	galleryPopup.classList.add('open');
});

// Any popup closes via its × button or a click on the dark backdrop
document.querySelectorAll('.popup').forEach((p) => {
	p.addEventListener('click', (event) => {
		if(event.target === p || event.target.hasAttribute('data-close'))
		{
			p.classList.remove('open');
		}
	});
});

function onUnlitCandleClick(candle)
{
	if(litCount >= lightOrder.length)
	{
		return; // tonight's menorah is already fully lit
	}

	const day = parseInt(candle.dataset.day);

	if(day !== lightOrder[litCount])
	{
		shake(candle); // wrong order: ignore the click
		return;
	}

	litCount++;
	saveProgress();
	render();

	if(litCount === lightOrder.length)
	{
		setTimeout(() => showDailyImage(night), 600); // brief pause so the last flame is seen first
	}
}

document.querySelectorAll('.unlit-candle').forEach((candle) => {
	candle.addEventListener('click', () => onUnlitCandleClick(candle));
});

render();