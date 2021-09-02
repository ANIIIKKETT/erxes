import Automations from "../models/Automations"

export const formSubmit = async ({ trigger, data, targetId }) => {

  const automations = await Automations.find({ 'triggers.config.contentId': targetId, 'triggers.type': 'formSubmit' });

  if (automations.length === 0) {
    return false;
  }


  // check each actions of automations and process action
  for (const { actions } of automations) {
    console.log('actions: ', trigger, data, actions)
  }

  return true;
}