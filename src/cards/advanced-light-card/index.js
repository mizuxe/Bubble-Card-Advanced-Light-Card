// Updated index.js for Advanced Light Card
import { createStructure, createSliderStructure } from './create.js';
import { onSliderChange, updateEntity } from '../../tools/utils.js';

export function handleAdvancedLightCard(context) {
    createStructure(context);
    createSliderStructure(context);

    // Example setup for testing the UI
    const testElement = document.createElement('p');
    testElement.textContent = 'Advanced Light Card Loaded';
    testElement.style.color = 'white';
    testElement.style.background = 'blue';
    context.appendChild(testElement);

    // Optional: Additional setup for slider integration and entity control
    context.elements.slider.addEventListener('input', (event) => {
        onSliderChange(event, context);
    });

    context.elements.closeButton.addEventListener('click', () => {
        context.elements.sliderContainer.classList.add('is-hidden');
    });
}