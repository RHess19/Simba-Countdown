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

let christmasDate = new Date("12/25/2025");
christmasDate.setHours(0, 0, 0, 0);

const countdown = setInterval(function() {
	const now = new Date().getTime();
	const remainingTime = christmasDate - now;

	const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
	const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
	
	const displayDays = String(days).padStart(2, '0');
    const displayHours = String(hours).padStart(2, '0');
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');

	if(remainingTime < 0)
	{
		clearInterval(countdown);
	}

	let countdownElement = document.querySelector('.countdown-timer');
	countdownElement.textContent = displayDays + ":" + displayHours + ":" + displayMinutes + ":" + displaySeconds;
}, 1000);


let currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);
let date1 = new Date("12/1/2025");
let date2 = new Date("12/2/2025");
let date3 = new Date("12/3/2025");
let date4 = new Date("12/4/2025");
let date5 = new Date("12/5/2025");
let date6 = new Date("12/6/2025");
let date7 = new Date("12/7/2025");
let date8 = new Date("12/8/2025");
let date9 = new Date("12/9/2025");
let date10 = new Date("12/10/2025");
let date11 = new Date("12/11/2025");
let date12 = new Date("12/12/2025");
let date13 = new Date("12/13/2025");
let date14 = new Date("12/14/2025");
let date15 = new Date("12/15/2025");
let date16 = new Date("12/16/2025");
let date17 = new Date("12/17/2025");
let date18 = new Date("12/18/2025");
let date19 = new Date("12/19/2025");
let date20 = new Date("12/20/2025");
let date21 = new Date("12/21/2025");
let date22 = new Date("12/22/2025");
let date23 = new Date("12/23/2025");
let date24 = new Date("12/24/2025");
let date25 = new Date("12/25/2025");

// Dictionary of "date" => "present id"
const dateIdMap = {
	"#present1": date1,
	"#present2": date2,
	"#present3": date3,
	"#present4": date4,
	"#present5": date5,
	"#present6": date6,
	"#present7": date7,
	"#present8": date8,
	"#present9": date9,
	"#present10": date10,
	"#present11": date11,
	"#present12": date12,
	"#present13": date13,
	"#present14": date14,
	"#present15": date15,
	"#present16": date16,
	"#present17": date17,
	"#present18": date18,
	"#present19": date19,
	"#present20": date20,
	"#present21": date21,
	"#present22": date22,
	"#present23": date23,
	"#present24": date24,
	"#present25": date25
};

const scrollToCurrentDayButton = document.getElementById('scrollToCurrentDay');
let currentDayElement = null;

// On page load, open all tiles whose dates are before today
// Show lock icon over tiles later than today
// Remove lock icon for today's tile, but do not open
Object.entries(dateIdMap).forEach(([doorID, dateVar]) => {
	const doorElement = document.querySelector(doorID);
	if(!doorElement) return;

	//const lockImage = doorElement.querySelector('.lock-image');
	const doorImage = doorElement.querySelector('.door-image');

	if(dateVar < currentDate)
	{
		doorElement.classList.add('opened');
		//if(lockImage) lockImage.style.display = 'none';
	}
	else if(dateVar.getTime() === currentDate.getTime())
	{
		//if(lockImage) lockImage.style.display = 'none';

		doorElement.addEventListener('click', () => {
			doorElement.classList.add('opened');
		});

		currentDayElement = doorElement;
		scrollToCurrentDayButton.style.display = 'block';
	}
	else
	{
		doorElement.addEventListener('click', () => {
			alert("Come back later to see another Simba picture!");
		});
		//doorImage.classList.add('faded');
		// lockImage.classList.add('not-faded');
	}
});

if(currentDayElement)
{
	scrollToCurrentDayButton.addEventListener('click', () => {
		currentDayElement.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	});
}