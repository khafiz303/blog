function changeEditMenu(element) {
    // Находим 'panel-menu' внутри текущего 'editor'
    const menu = element.querySelector('.panel-menu');
    if (menu) {
        menu.classList.toggle('open');
    }
}