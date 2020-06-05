import { discordConfig } from 'Utils/discordConfig';

const discordSwitch = dataCenter => {
    const dc = dataCenter.toLowerCase();
    switch (dc) {
        case 'aether': {
            return discordConfig.aetherURL;
        };
        case 'chaos': {
            return discordConfig.chaosURL;
        }
        case 'crystal': {
            return discordConfig.crystalURL;
        };
        case 'elemental': {
            return discordConfig.elementalURL;
        }
        case 'gaia': {
            return discordConfig.gaiaURL;
        }
        case 'light': {
            return discordConfig.lightURL;
        }
        case 'mana': {
            return discordConfig.manaURL;
        }
        case 'primal': {
            return discordConfig.primalURL;
        };
        default: {
            return null;
        };
    };
};

export default discordSwitch;