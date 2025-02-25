// Updated changes.js for Advanced Light Card

import { getIconColor, getAttribute, isEntityType, isStateOn } from '../../tools/utils.js';

export function changeStatus(context) {
    const entity = context._hass.states[context.config.entity];
    const status = entity ? entity.state : 'unavailable';
    context.elements.name.innerText = status;
}

export function changeIcon(context) {
    const icon = context.elements.iconButton;
    const entity = context._hass.states[context.config.entity];

    if (entity) {
        icon.setAttribute('icon', entity.state === 'on' ? 'mdi:lightbulb-on' : 'mdi:lightbulb-off');
        icon.style.color = getIconColor(entity);
    }
}

export function changeName(context) {
    const nameElement = context.elements.name;
    nameElement.innerText = context.config.name || context.config.entity;
}

export function changeSlider(context) {
    const slider = context.elements.sliderContainer;
    const entity = context._hass.states[context.config.entity];

    if (context.config.slider_type === 'brightness') {
        const brightness = getAttribute(context, 'brightness') || 0;
        slider.value = (brightness / 255) * 100;
    } else if (context.config.slider_type === 'temperature') {
        const temperature = getAttribute(context, 'color_temp') || 2000;
        slider.value = temperature;
    } else if (context.config.slider_type === 'color') {
        const rgb = entity.attributes.rgb_color || [255, 255, 255];
        slider.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
}

export function changeStyle(context) {
    const card = context.elements.advancedLightCard;
    card.style.backgroundColor = context.config.background_color || '#ffffff';
}