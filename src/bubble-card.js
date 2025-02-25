// Updated bubble-card.js with Advanced Light Card integration
import { version } from './var/version.js';
import { initializeContent } from './tools/init.js';
import { handlePopUp } from './cards/pop-up/index.js';
import { handleHorizontalButtonsStack } from './cards/horizontal-buttons-stack/index.js';
import { handleButton } from './cards/button/index.js';
import { handleSeparator } from './cards/separator/index.js';
import { handleCover } from './cards/cover/index.js';
import { handleEmptyColumn } from './cards/empty-column/index.js';
import { handleMediaPlayer } from './cards/media-player/index.js';
import { handleSelect } from './cards/select/index.js';
import { handleClimate } from './cards/climate/index.js';
import { changeEditor } from './cards/pop-up/changes.js';
import { preloadYAMLStyles } from './tools/style-utils.js';
import BubbleCardEditor from './editor/bubble-card-editor.js';
import { handleAdvancedLightCard } from './cards/advanced-light-card/index.js';

class BubbleCard extends HTMLElement {
    editor = false;
    isConnected = false;

    connectedCallback() {
        this.isConnected = true;
        preloadYAMLStyles(this);

        if (this._hass) {
            this.updateBubbleCard();
        }
    }

    disconnectedCallback() {
        this.isConnected = false;
    }

    set hass(hass) {
        initializeContent(this);
        this._hass = hass;

        if (this.isConnected) {
            this.updateBubbleCard();
        }
    }

    updateBubbleCard() {
        switch (this.config.card_type) {
            case 'advanced-light-card':
                handleAdvancedLightCard(this);
                break;
            case 'pop-up':
                handlePopUp(this);
                break;
            case 'button':
                handleButton(this);
                break;
            case 'separator':
                handleSeparator(this);
                break;
            case 'cover':
                handleCover(this);
                break;
            case 'empty-column':
                handleEmptyColumn(this);
                break;
            case 'media-player':
                handleMediaPlayer(this);
                break;
            case 'select':
                handleSelect(this);
                break;
            case 'climate':
                handleClimate(this);
                break;
        }
    }
}

customElements.define('bubble-card', BubbleCard);
export default BubbleCard;