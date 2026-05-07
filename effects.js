controls = {
    "Effect-On": {
        name: "Effect-On",
        control_channel_enabled: 0,
        sysex_fader: null,
        sysex_enabled: {
            category: 0x00,
            address: 0x30
        }
    },
    "Reverb-On": {
        name: "Reverb-On",
        control_channel_enabled: 2,
        sysex_fader: null,
        sysex_enabled: {
            category: 0xFF,
            address: 0xFF
        }
    },
    "Pitch": {
        name: "Pitch",
        control_channel_enabled: null,
        sysex_enabled: null,
        sysex_fader: {
            category: 0x02,
            address: 0x20
        }
    },
    "Formant": {
        name: "Formant",
        control_channel_enabled: null,
        sysex_enabled: null,
        sysex_fader: {
            category: 0x02,
            address: 0x22
        }
    },
    "Mix-Link": {
        name: "Mix-Link",
        control_channel_enabled: null,
        sysex_fader: null,
        sysex_enabled: {
            category: 0x00,
            address: 0x40
        }
    },
    "Stream Monitor": {
        name: "Stream Monitor",
        control_channel_enabled: null,
        sysex_fader: null,
        sysex_enabled: {
            category: 0x00,
            address: 0x02
        }
    }
}
