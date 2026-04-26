const filterContainer = document.querySelector(".filters-list");
const imageInput = document.querySelector("#image-input");
const bottomForImage = document.querySelector(".bottom");
const presetContainer = document.querySelector(".presets-list");
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
let imageCanvas = null;
let file = null;
let image = null;
let canvasCtx = null;
let filters = {
    Brightness: {
        value:100,
        min:0,
        max:200,
        unit : "%",
    },
    Contrast: {
        value:100,
        min:0,
        max:200,
        unit : "%",
    },
    Saturation: {
        value:100,
        min:0,
        max:200,
        unit : "%",
    },
    HueRotate: {
        value:0,
        min:0,
        max:360,
        unit : "deg",
    },
    Blur: {
        value:0,
        min:0,
        max:10,
        unit : "px"
    },
    Sepia: {
        value:0,
        min:0,
        max:100,
        unit : "%",
    },
    Grayscale: {
        value:0,
        min:0,
        max:100,
        unit : "%",
    },
    Opacity: {
        value:100,
        min:0,
        max:100,
        unit : "%",
    },
    Invert: {
        value:0,
        min:0,
        max:100,
        unit : "%",
    },
    

};

function createFilterElement(name,unit,value,min,max){
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.name = name;
    input.min = min;
    input.max = max;
    input.value = value
    
    const p = document.createElement("p");
    p.innerHTML = name;
    input.addEventListener("input",(event)=>{
        filters[name].value = Number(input.value);
        applyFilters();
    });
    div.appendChild(p);
    div.appendChild(input);
    return div;
}
function createFilter(){
    Object.keys(filters).forEach(filterName => {
        const filterElement = createFilterElement(filterName,filters[filterName].unit,filters[filterName].value,filters[filterName].min,filters[filterName].max);
        filterContainer.appendChild(filterElement);
    });
};
createFilter();
imageInput.addEventListener("change", (event)=>{
    const imgPlaceholder = document.querySelector(".placeholder");
    imgPlaceholder.style.display = "none";

    if (!imageCanvas) {
        imageCanvas = document.createElement("canvas");
        bottomForImage.appendChild(imageCanvas);
        canvasCtx = imageCanvas.getContext("2d");
    }
    const canvasContext = imageCanvas.getContext("2d");
    canvasCtx = canvasContext;

    file = event.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = ()=>{
        image = img;
        imageCanvas.width = image.width;
        imageCanvas.height = image.height;
        canvasCtx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
        applyFilters();
    }
});
function getFilterString(){
    return `brightness(${filters.Brightness.value}${filters.Brightness.unit}) ` +
            `contrast(${filters.Contrast.value}${filters.Contrast.unit}) ` +
            `saturate(${filters.Saturation.value}${filters.Saturation.unit}) ` +
            `hue-rotate(${filters.HueRotate.value}${filters.HueRotate.unit}) ` +
            `blur(${filters.Blur.value}${filters.Blur.unit}) ` +
            `grayscale(${filters.Grayscale.value}${filters.Grayscale.unit}) ` +
            `sepia(${filters.Sepia.value}${filters.Sepia.unit}) ` +
            `opacity(${filters.Opacity.value}${filters.Opacity.unit}) ` +
            `invert(${filters.Invert.value}${filters.Invert.unit})`;
}
const supportsCanvasFilter = 'filter' in CanvasRenderingContext2D.prototype;
function applyFilters() {
    if(!canvasCtx || !image) return;
    const filterString = getFilterString();
    const canvas = canvasCtx.canvas;
    if (supportsCanvasFilter) {
        // Canvas Method
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.filter = filterString;
        canvasCtx.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvasCtx.filter = "none";
    } else {
        //Safari Callback
        imageCanvas.style.filter = filterString;
    }
}

resetButton.addEventListener("click", () => {
    Object.keys(filters).forEach(key => {
        if (key === "HueRotate" || key === "Blur" || key === "Sepia" || key === "Grayscale" || key === "Invert") {
            filters[key].value = 0;
        } else {
            filters[key].value = 100;
        }
    });
    filterContainer.innerHTML = "";
    createFilter();
    applyFilters();
});
downloadButton.addEventListener("click", ()=>{
    applyFilters();
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
});
const presets = {
    Normal: {
        Brightness: 100,
        Contrast: 100,
        Saturation: 100,
        HueRotate: 0,
        Blur: 0,
        Sepia: 0,
        Grayscale: 0,
        Opacity: 100,
        Invert: 0,
    },

    Vintage: {
        Brightness: 90,
        Contrast: 110,
        Saturation: 80,
        HueRotate: 10,
        Blur: 0,
        Sepia: 40,
        Grayscale: 10,
        Opacity: 100,
        Invert: 0,
    },

    Dramatic: {
        Brightness: 95,
        Contrast: 140,
        Saturation: 120,
        HueRotate: 0,
        Blur: 0,
        Sepia: 0,
        Grayscale: 0,
        Opacity: 100,
        Invert: 0,
    },

    Cool: {
        Brightness: 100,
        Contrast: 105,
        Saturation: 110,
        HueRotate: 180,
        Blur: 0,
        Sepia: 0,
        Grayscale: 0,
        Opacity: 100,
        Invert: 0,
    },

    Warm: {
        Brightness: 105,
        Contrast: 105,
        Saturation: 120,
        HueRotate: 20,
        Blur: 0,
        Sepia: 20,
        Grayscale: 0,
        Opacity: 100,
        Invert: 0,
    },

    Noir: {
        Brightness: 100,
        Contrast: 130,
        Saturation: 0,
        HueRotate: 0,
        Blur: 0,
        Sepia: 0,
        Grayscale: 100,
        Opacity: 100,
        Invert: 0,
    },

    Dreamy: {
        Brightness: 110,
        Contrast: 90,
        Saturation: 120,
        HueRotate: 0,
        Blur: 2,
        Sepia: 10,
        Grayscale: 0,
        Opacity: 100,
        Invert: 0,
    },

    Cyberpunk: {
        Brightness: 110,
        Contrast: 150,
        Saturation: 140,
        HueRotate: 300,
        Blur: 0,
        Sepia: 0,
        Grayscale: 0,
        Opacity: 100,
        Invert: 10,
    },

    Washed: {
        Brightness: 120,
        Contrast: 80,
        Saturation: 70,
        HueRotate: 0,
        Blur: 1,
        Sepia: 10,
        Grayscale: 20,
        Opacity: 100,
        Invert: 0,
    }
};
Object.keys(presets).forEach((presetName)=>{
    const presetButton = document.createElement("button");
    presetButton.classList.add("preset-btn");
    presetButton.innerText = presetName;
    presetContainer.appendChild(presetButton);

    presetButton.addEventListener("click", ()=>{
        const preset = presets[presetName];
        Object.keys(preset).forEach((filterName)=>{
            filters[filterName].value = preset[filterName];
        })
        applyFilters();
    });
});