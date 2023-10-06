'use strict';

const openButton = document.querySelector('#open');
const closeButton = document.querySelector('#close');

openButton.addEventListener('click', () => {
	const nav = document.querySelector('#nav');
	console.log(nav);
	nav.classList.remove('hidden');
});

closeButton.addEventListener('click', () => {
	const nav = document.querySelector('#nav');
	console.log(nav);
	nav.classList.add('hidden');
});
