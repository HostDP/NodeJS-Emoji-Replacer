//Підключаємо бібліотеки
const sharp = require(`sharp`);
const fs = require(`fs`);
//Отримуємо усі файли нових та старих емоджі
let oldEmoji=fs.readdirSync(`./old`);
let newEmoji=fs.readdirSync(`./new`);
let errors = [];
for (let i = 0; i < oldEmoji.length; i++) {
	//Отримуємо ID емоджі що потрібні
	let oldPng = oldEmoji[i].split(`_`)[1].substring(1).toLowerCase(); 
	//Знаходимо потрібний SVG нового емоджі для рендеру
	let newSvg = newEmoji.find(value=>value.indexOf(oldPng)!=-1);
	//Якщо файл не знайдено - додаємо до списку помилок
	if (newSvg==undefined)
		errors.push([newSvg, oldEmoji[i]]);
	//Рендеремо SVG у PNG
	render (newSvg, oldEmoji[i])
}
//Виводимо помилки у консоль
console.log (errors);

//Функкція рендеру
function render(newSvg,renderedPng) {
    //Задаємо де зберігаються SVG та потрібний розмір PNG
    sharp("./new/"+newSvg, {density:200})
        .png()
        //Задаємо шлях куди складати нові відрендерені емоджі
        .toFile("./rendered/"+renderedPng)
        .then(function(info) {})
        .catch(console.log)
}