export function getCustomProp(ele, prop) {
    //get property ans=d edit in css file
    return parseFloat(getComputedStyle(ele).getPropertyValue(prop)) || 0;
}
export function setCustomProp(ele, prop, val) {
    ele.style.setProperty(prop, val);
}

export function incCustomProp(ele, prop, inc) {
    setCustomProp(ele, prop, getCustomProp(ele, prop) + inc);
}