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

const expandTopnav = () => document.getElementById('topnav').classList.toggle('expanded');

addLoadEvent(() => {
	document.querySelectorAll('*').forEach((element) => {
		const load = element.getAttribute('load');
		if (load) { fetch(load).then((response) => response.text()).then((response) => element.innerHTML = response); }
	});
});

addLoadEvent(() => {
	// Find selected tab in URL query parameters.
	const query = new URLSearchParams(location.search).get('tab');

	// Add tab buttons.
	document.querySelectorAll('div.tab').forEach((tab) => {
		const tabController = tab.querySelector(':scope > div.tab-controller');
		tab.querySelectorAll(':scope > div.tab-content > div.tab-panel').forEach((panel) => {
			const button = document.createElement('button');
			button.className = 'tab-button';
			button.innerHTML = panel.id.replace(/_/g, ' ');
			button.onclick = () => {
				tab.querySelectorAll(':scope > div.tab-controller > button.tab-button').forEach((button) => button.classList.remove('active'));
				tab.querySelectorAll(':scope > div.tab-content > div.tab-panel').forEach((panel) => panel.classList.remove('active'));

				panel.classList.add('active');
				button.classList.add('active');
			};
			if (panel.classList.contains('auto-open')) { button.click(); }
			tabController.append(button);

			if (query == panel.id) { button.onclick(); }
		});
	});
});
