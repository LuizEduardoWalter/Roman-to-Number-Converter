var inputNumber;
const output = document.getElementById("output");
const romanNumbers = [
  { number: 1, un: "I", ten: "X", hundred: "C", thousand: "M" },
  { number: 2, un: "II", ten: "XX", hundred: "CC", thousand: "MM" },
  { number: 3, un: "III", ten: "XXX", hundred: "CCC", thousand: "MMM" },
  { number: 4, un: "IV", ten: "XL", hundred: "CD", thousand: "IV" },
  { number: 5, un: "V", ten: "L", hundred: "D", thousand: "V" },
  { number: 6, un: "VI", ten: "LX", hundred: "DC", thousand: "VI" },
  { number: 7, un: "VII", ten: "LXX", hundred: "DCC", thousand: "VII" },
  { number: 8, un: "VIII", ten: "LXXX", hundred: "DCCC", thousand: "VIII" },
  { number: 9, un: "IX", ten: "XC", hundred: "CM", thousand: "IX" },
];

function sendValue() {
  output.innerHTML = "";
  inputNumber = document.getElementById("number").value;
  var value = Number(inputNumber);
  if (!Number.isNaN(value)) {
    const result = converter(value);
    output.innerHTML = result;
  }
}

document.getElementById("number").addEventListener("keydown", function (e) {
  if (e.key === "." || e.key === ",") {
    e.preventDefault();
  }
});

function converter(value) {
  const un = value % 10;
  if (value >= 1 && value <= 9) {
    const romanNumber = romanNumbers.find((rn) => rn.number === value);
    return romanNumber.un;
  }

  if (value >= 10 && value <= 99) {
    let ten = Math.floor(value / 10);
    let resultUn = romanNumbers.find((rn) => rn.number === un);
    let resultTen = romanNumbers.find((rn) => rn.number === ten);
    return resultTen.ten + (resultUn?.un || "");
  }

  if (value >= 100 && value <= 999) {
    const ten = String(value).substring(1, 2);
    var hundred = Math.floor(value / 100) % 10;

    let resultUn = romanNumbers.find((rn) => rn.number === un);
    let resultTen = romanNumbers.find((rn) => rn.number === Number(ten));
    let resultHundred = romanNumbers.find((rn) => rn.number === hundred);

    return (
      resultHundred.hundred + (resultTen?.ten || "") + (resultUn?.un || "")
    );
  }

  if (value >= 1000 && value <= 9999) {
    var thousand = Math.floor(value / 1000);
    var hundred = Math.floor(value / 100) % 10;
    const ten = String(value).substring(2, 3);

    let resultThousand = romanNumbers.find((rn) => rn.number === thousand);
    let resultHundred = romanNumbers.find((rn) => rn.number === hundred);
    let resultTen = romanNumbers.find((rn) => rn.number === Number(ten));
    let resultUn = romanNumbers.find((rn) => rn.number === un);

    return (
      resultThousand.thousand +
      (resultHundred?.hundred || "") +
      (resultTen?.ten || "") +
      (resultUn?.un || "")
    );
  }

  if (value >= 10000) {
    var tenThousand = Math.floor(value / 10000);
    var thousand = Math.floor(value / 1000) % 10;
    var hundred = Math.floor(value / 100) % 10;
    const ten = String(value).substring(3, 4);
    let resultTenThousand = romanNumbers.find(
      (rn) => rn.number === tenThousand
    );

    let resultThousand = romanNumbers.find((rn) => rn.number === thousand);
    let resultHundred = romanNumbers.find((rn) => rn.number === hundred);
    let resultTen = romanNumbers.find((rn) => rn.number === Number(ten));
    let resultUn = romanNumbers.find((rn) => rn.number === un);
    let tenValue = resultTenThousand
      ? resultTenThousand.ten
      : "" + (resultTenThousand ? resultTenThousand.un : "");
    return (
      `<span class="outputThousand">${tenValue}</span>` +
      `<span class="outputThousand">${resultThousand?.un || ""}</span>` +
      (resultHundred?.hundred || "") +
      (resultTen?.ten || "") +
      (resultUn?.un || "")
    );
  }
  return "";
}
