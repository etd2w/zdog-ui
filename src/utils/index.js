import Zdog from "zdog";
import { v4 as uuid, validate as uuidValidate } from "uuid";

function revive(child) {
  const newChild = new Zdog[child.type]({ ...child });
  newChild.id = child.id;
  newChild.name = child.name;
  newChild.type = child.type;

  if (child.children) {
    child.children.forEach(item => {
      if (item.id) {
        newChild.addChild(revive(item));
      }
    });
  }

  return newChild;
}

export default function createCanvas(node, props, modelID = undefined) {
  const illo = new Zdog.Illustration({
    element: document.querySelector(node),
    centered: true,
    dragRotate: true,
    ...props,
  });

  if (uuidValidate(modelID)) {
    const JSONModel = localStorage.getItem(modelID);
    const children = JSON.parse(JSONModel).children;

    children.forEach(child => {
      child.id = uuid();
      illo.addChild(revive(child));
    });
    illo.canvasId = JSON.parse(JSONModel).id;
  } else if (typeof modelID === "object") {
    modelID.children.forEach(child => {
      child.id = uuid();
      illo.addChild(revive(child));
    });
    illo.canvasId = modelID.id;
  } else {
    illo.canvasId = uuid();
  }

  function animate() {
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
  }

  animate();

  return illo;
}

export function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  let alphaFromHex = 1;

  if (hex.length === 8) {
    alphaFromHex = Number.parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  }

  if (hex.length === 4) {
    alphaFromHex = Number.parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
    hex = hex.slice(0, 3);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const number = Number.parseInt(hex, 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;
  const alpha = alphaFromHex;

  const alphaString =
    alpha === 1 ? "" : ` / ${Number((alpha * 100).toFixed(2))}%`;
  return `rgb(${red} ${green} ${blue}${alphaString})`;
}

export function rgbToHex(rgb) {
  let [r, g, b, alpha] = rgb.match(/(0?\.?\d{1,3})%?\b/g).map(Number);

  if (alpha !== 1) {
    alpha = Math.round(255 * alpha);
    alpha = (alpha | (1 << 8)).toString(16).slice(1);
  } else {
    alpha = "";
  }

  return `#${
    (b | (g << 8) | (r << 16) | (1 << 24)).toString(16).slice(1) + alpha
  }`;
}
