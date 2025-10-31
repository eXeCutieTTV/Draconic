const test = function test(word) {
    console.log(word);
}
const clearPageById = function clearPageById(id) {
    const page = document.getElementById(id);
    if (!page) return
    if (page) {
        page.remove();
        console.log('removed page by id: ' + id);
    }
}
const createPageById = function createPageById(id, html) {
    let page = document.getElementById(id);
    if (!page) {
        page = document.createElement('div');
        page.id = id;
        page.className = 'page';
    }
    page.innerHTML = html;

    const pagewrapper = document.querySelector('.pages');

    if (!pagewrapper) {
        console.error("no div with class '.pages'");
        return;
    }

    pagewrapper.appendChild(page);
}
const createDivById = function createDivById(id, wrapper, html) {
    let div = document.getElementById(id);
    if (!div) {
        div = document.createElement('div');
    }
    if (id.length > 0) {
        div.id = id;
    }
    div.innerHTML = html;

    const divwrapper = wrapper;

    if (!divwrapper) {
        console.error("no div wrapper");
        return;
    }

    divwrapper.appendChild(div);
}

const standard = {
    test,
    clearPageById,
    createPageById,
    createDivById
}

const helperFunctions =
{
    standard,
}