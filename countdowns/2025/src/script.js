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
	const countdownElement = document.querySelector('.countdown-timer');
	if(!countdownElement) return;

	const remainingTime = christmasDate - new Date().getTime();

	if(remainingTime < 0)
	{
		clearInterval(countdown);
		countdownElement.textContent = "00:00:00:00";
		return;
	}

	const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
	const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

	countdownElement.textContent =
		String(days).padStart(2, '0') + ":" +
		String(hours).padStart(2, '0') + ":" +
		String(minutes).padStart(2, '0') + ":" +
		String(seconds).padStart(2, '0');
}, 1000);

// Tiles start closed and can be flipped open and closed at any time
document.querySelectorAll('.door').forEach(door => {
	door.addEventListener('click', () => {
		door.classList.toggle('opened');
	});
});