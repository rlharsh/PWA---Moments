document.getElementById('navi-toggle').addEventListener('change', () => {

    if (document.getElementById('navi-toggle').checked) {

        document.getElementById('primary-content-wrapper').classList.add('fade-out');

    } else {

        document.getElementById('primary-content-wrapper').classList.remove('fade-out');

    }

})