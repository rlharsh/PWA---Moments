document.getElementById('navi-toggle').addEventListener('change', () => {

    if (document.getElementById('navi-toggle').checked) {

        document.getElementById('primary-content-wrapper').classList.add('fade-out');
        document.getElementById('cta-actions').classList.add('show-cta-actions');

    } else {

        document.getElementById('primary-content-wrapper').classList.remove('fade-out');
        document.getElementById('cta-actions').classList.remove('show-cta-actions');

    }

})