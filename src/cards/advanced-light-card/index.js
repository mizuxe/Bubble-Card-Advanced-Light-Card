// Updated Advanced Light Card for Home Assistant

import { changeState, changeSubButtonState } from '../../tools/global-changes.js';
import { initializeContent } from '../../tools/init.js';
import { addActions } from '../../tools/tap-actions.js';
import { updateIcon } from '../../tools/style.js';
import { handleCustomStyles } from '../../tools/style-utils.js';
import { checkConditionsMet } from '../../tools/validate-condition.js';
import { getIcon, isStateOn, isEntityType, getAttribute } from '../../tools/utils.js';
import { changeIcon, changeSlider, changeName, changeStatus, changeStyle } from './changes.js';
import { createStructure, createSliderStructure } from './create.js';

export function handleAdvancedLightCard(context) {
    initializeContent(context);
    const { entity } = context.config;

    if (!entity) return;

    const buttonType = context.config.button_type || 'default';
    if (context.cardType !== `advanced-light-card-${buttonType}` && context.buttonType !== buttonType) {
        createStructure(context);

        if (buttonType === 'slider') {
            createSliderStructure(context);
        }
    }

    changeStatus(context);
    changeIcon(context);
    changeName(context);
    changeSlider(context);
    changeStyle(context);
    changeState(context);
    changeSubButtonState(context, context.content, context.elements.advancedLightCard);

    handleCustomStyles(context);

    addActions(context.elements.iconButton, context.config, entity);
}