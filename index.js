import './src/styles/index.scss';

function addEl () {
    const el = document.createElement('p');
    el.className = 'test-element';
    el.textContent = 'Hello';
    document.body.appendChild(el);
}

document.body.classList.add('new');

addEl();