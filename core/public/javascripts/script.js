document.addEventListener(
    'DOMContentLoaded',
    () => {
        console.log('JS Imported');
    },
    false
);

// To handle side navBar -> Option('draggable')
document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems, 'draggable');
});
