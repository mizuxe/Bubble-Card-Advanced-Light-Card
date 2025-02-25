// Updated helpers.js for Advanced Light Card

export function getButtonType(context) {
  const entity = context._hass.states[context.config.entity];

  if (!entity) {
      return 'default';
  }

  if (entity.attributes.supported_features & 1) {
      return 'slider';
  } else if (entity.attributes.supported_features & 2) {
      return 'temperature';
  } else if (entity.attributes.rgb_color) {
      return 'color';
  }

  return 'default';
}

export function throttledUpdateEntity(context, service, data, delay = 500) {
  clearTimeout(context.updateTimeout);
  context.updateTimeout = setTimeout(() => {
      context._hass.callService('light', service, data);
  }, delay);
}

export function onSliderChange(context, value, attribute) {
  const data = { entity_id: context.config.entity };
  if (attribute === 'brightness') {
      data.brightness = Math.round((value / 100) * 255);
  } else if (attribute === 'color_temp') {
      data.color_temp = value;
  } else if (attribute === 'rgb_color') {
      data.rgb_color = value;
  }
  throttledUpdateEntity(context, 'turn_on', data);
}