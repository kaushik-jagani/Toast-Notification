const refreshBtn = document.querySelector(".refresh-btn");
const container = document.querySelector(".container");

const maxPalleteBoxes = 36;

const generatePalette = () => {
  //clearing container befor refresh pallette

  container.innerHTML = "";
  for (let i = 0; i < maxPalleteBoxes; i++) {
    let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    randomHex = `#${randomHex.padStart(6, "0")}`;

    //create a new li elemnt with class and insert into container
    const color = document.createElement("li");
    color.classList.add("color"); //add class in element
    color.innerHTML = ` <div class="rect-box" style="background-color : ${randomHex}"></div>
    <span class="hex-value">${randomHex}</span>`;

    //adding click evnt for copying hexcode
    color.addEventListener("click", () => copyColor(color, randomHex));
    container.appendChild(color);
  }
};

//first time come user
generatePalette();

const copyColor = (elem, hexval) => {
  const colorElement = elem.querySelector(".hex-value");

  navigator.clipboard
    .writeText(hexval)
    .then(() => {
      colorElement.innerText = "Copied";
      setTimeout(() => (colorElement.innerText = hexval), 200);
    })
    .catch(() => alert("Failed to copy the color code!"));
};

refreshBtn.addEventListener("click", generatePalette);
