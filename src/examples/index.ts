import '../components';

document.addEventListener('DOMContentLoaded', () => {
    const personPicker = document.querySelector('#person-picker');

    personPicker.addEventListener('filter', (e: CustomEvent) => {
        console.log(e.detail.filter);
    });
});