// Credit: Simon Willison.
addLoadEvent = (event) => {
	const old = onload;
	if (typeof old != 'function') {
		onload = event;
	} else {
		onload = () => {
			old();
			event();
		}
	}
}

addLoadEvent(() => {
	document.querySelectorAll('*').forEach((element) => {
		const load = element.getAttribute('load');
		if (load) { fetch(load).then((response) => response.text()).then((response) => element.innerHTML = response); }
	});
});

const expandTopnav = () => document.getElementById('topnav').classList.toggle('expanded');