// Updated create.js for Advanced Light Card

import { addActions } from '../../tools/tap-actions.js';
import { createElement } from '../../tools/utils.js';

export function createStructure(context) {
    context.elements = {};

    context.elements.advancedLightCard = createElement('div', 'advanced-light-card');
    context.elements.iconButton = createElement('ha-icon', 'icon-button');
    context.elements.name = createElement('div', 'card-title');
    context.elements.brightnessButton = createElement('button', 'brightness-button');
    context.elements.temperatureButton = createElement('button', 'temperature-button');
    context.elements.colorButton = createElement('button', 'color-button');

    context.elements.sliderContainer = createElement('div', 'slider-container is-hidden');
    context.elements.slider = createElement('input', 'slider');
    context.elements.slider.type = 'range';
    context.elements.closeButton = createElement('button', 'close-button');
    context.elements.closeButton.innerText = 'X';

    context.elements.advancedLightCard.appendChild(context.elements.iconButton);
    context.elements.advancedLightCard.appendChild(context.elements.name);
    context.elements.advancedLightCard.appendChild(context.elements.brightnessButton);
    context.elements.advancedLightCard.appendChild(context.elements.temperatureButton);
    context.elements.advancedLightCard.appendChild(context.elements.colorButton);
    context.elements.advancedLightCard.appendChild(context.elements.sliderContainer);
    context.elements.sliderContainer.appendChild(context.elements.slider);
    context.elements.sliderContainer.appendChild(context.elements.closeButton);

    context.content.innerHTML = '';
    context.content.appendChild(context.elements.advancedLightCard);

    addActions(context.elements.iconButton, context.config, context.config.entity);

    context.elements.closeButton.addEventListener('click', () => {
        context.elements.sliderContainer.classList.add('is-hidden');
    });
}

// New function to create the slider structure
export function createSliderStructure(context) {
    const { sliderContainer, slider } = context.elements;

    sliderContainer.classList.remove('is-hidden');

    slider.min = context.config.slider_type === 'temperature' ? 2000 : 0;
    slider.max = context.config.slider_type === 'temperature' ? 6500 : 100;
    slider.step = 1;

    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        if (context.config.slider_type === 'brightness') {
            context._hass.callService('light', 'turn_on', {
                entity_id: context.config.entity,
                brightness: Math.round((value / 100) * 255),
            });
        } else if (context.config.slider_type === 'temperature') {
            context._hass.callService('light', 'turn_on', {
                entity_id: context.config.entity,
                color_temp: value,
            });
        } else if (context.config.slider_type === 'color') {
            context._hass.callService('light', 'turn_on', {
                entity_id: context.config.entity,
                rgb_color: [value, 100, 100],
            });
        }
    });
}
