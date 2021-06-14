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

export function createCopy(model) {
  const copy = model.copyGraph();
  copy.type = model.type;
  copy.name = model.name;
  copy.id = uuid();

  copy.children.forEach(childCopy => {
    model.children.forEach(child => {
      childCopy.type = child.type;
      childCopy.name = child.name;
      childCopy.id = uuid();
    });
  });

  return copy;
}

export function getIllo(layer) {
  const illo = layer.addTo.isCanvas ? layer.addTo : getIllo(layer.addTo);
  return illo;
}

export function createShape(type) {
  let child;

  if (type === "Shape") {
    child = new Zdog.Shape({
      path: new Array({ move: { x: 0, y: 0, z: 0 } }),
      width: 80,
      height: 80,
      diameter: 80,
      stroke: 20,
      sides: 4,
      length: 80,
      radius: 40,
      depth: 80,
      color: "#a9cf54",
    });
  } else {
    child = new Zdog[type]({
      width: 80,
      height: 80,
      diameter: 80,
      stroke: 20,
      sides: 4,
      length: 80,
      radius: 40,
      depth: 80,
      color: "#a9cf54",
    });
  }
  child.visible = true;
  child.type = type;
  child.name = type;
  child.id = uuid();

  return child;
}

export function hideShape(model, value = true) {
  model.visible = !value;
  model.children?.forEach(child => {
    hideShape(child, value);
  });
}

export function createCanvas(node, props, modelID = undefined) {
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
    illo.canvasId = modelID;
  } else if (typeof modelID === "object") {
    modelID.children.forEach(child => {
      child.id = uuid();
      illo.addChild(revive(child));
    });
    illo.canvasId = uuid();
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

export function saveModelToLocalStorage(model) {
  localStorage.setItem(model.canvasId, JSON.stringify(model));
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
