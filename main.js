/*const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});*/
const readline = require('readline');

const rl = readline.createInterface(
    process.stdin, process.stdout
);


const ask = (question) => {
    return new Promise(resolve => {
        rl.question(`${question}`, input => { resolve(input); });
    });
}

let answer;
const conversionList = [1, 113.5, 0.89, 74.36, 0.75];
const currencyList = ['USD', 'JPY', 'EUR', 'RUB', 'GBP'];

async function main() {

    function currencyText (item, index) {
        console.log(`1 USD equals  ${conversionList[index]} ${item}`)
    }

    console.log('Welcome to Currency Converter!');
    currencyList.forEach(currencyText);


    do {
        console.log('What do you want to do?');
        console.log('1-Convert currencies 2-Exit program');

        answer = await ask('');

        if (answer == '1') {
            // console.log('test');
            await currencyConvert();
        } else if (answer == '2') {
            console.log('Have a nice day!');
            rl.close();
        } else {
            console.log('Unknown input');
        }

    } while (answer != "2");

}

async function currencyConvert() {

    console.log(`What do you want to convert?`);
    let currencyFrom = await ask(`From: `);
    let indexFrom = currencyList.findIndex(currencyItem => currencyItem.toUpperCase() === currencyFrom.toUpperCase());
    if (indexFrom === -1) {
        console.log('Unknown currency');
        return
    }

    let currency= await ask(`To: `);
    let index = currencyList.findIndex(currencyItem => currencyItem.toUpperCase() === currency.toUpperCase());
    if (index === -1) {
        console.log('Unknown currency');
        return
    }

    let amount = await ask(`Amount:`);
    amount = Number(amount);
    if (amount < 0) {
        console.log(`The amount can not be less than 1`);
        return
    }
    if (isNaN(amount)) {
        console.log(`The amount has to be a number`);
        return
    }

    let conversion = amount / conversionList[indexFrom] * conversionList[index];
    console.log(`Result: ${amount} ${currencyList[indexFrom]} equals ${conversion.toFixed(4)} ${currencyList[index]}`);
}

main();

