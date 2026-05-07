micChannel = {
    name: "Mic",
    faderNode: null,
    faderNodePersonal: null,
    faderNodeStream: null,
    muteButtonNode: null,
    muteButtonNodePersonal: null,
    muteButtonNodeStream: null,
    control_channel: 1,
    mic_input_fader: {
        category: 0x07,
        address: 0x54
    },
    mic_input_enabled: {
        category: 0x07,
        address: 0x64
    },
    sysex_fader_personal: {
        category: 0x07,
        address: 0x10
    },
    sysex_enable_personal: {
        category: 0x07,
        address: 0x30
    },
    sysex_fader_stream: {
        category: 0x07,
        address: 0x00
    },
    sysex_enable_stream: {
        category: 0x07,
        address: 0x20
    }
};
auxChannel = {
    name: "Aux",
    faderNodePersonal: null,
    faderNodeStream: null,
    muteButtonNodePersonal: null,
    muteButtonNodeStream: null,
    control_channel: 2,
    sysex_fader_personal: {
        category: 0x07,
        address: 0x12
    },
    sysex_enable_personal: {
        category: 0x07,
        address: 0x32
    },
    sysex_fader_stream: {
        category: 0x07,
        address: 0x02
    },
    sysex_enable_stream: {
        category: 0x07,
        address: 0x22
    },
};
chatChannel = {
    name: "Chat",
    control_channel: 3,
    faderNodePersonal: null,
    faderNodeStream: null,
    muteButtonNodePersonal: null,
    muteButtonNodeStream: null,
    sysex_fader_personal: {
        category: 0x07,
        address: 0x14
    },
    sysex_enable_personal: {
        category: 0x07,
        address: 0x34
    },
    sysex_fader_stream: {
        category: 0x07,
        address: 0x04
    },
    sysex_enable_stream: {
        category: 0x07,
        address: 0x24
    },
};
gameChannel = {
    name: "Game",
    control_channel: 4,
    faderNodePersonal: null,
    faderNodeStream: null,
    muteButtonNodePersonal: null,
    muteButtonNodeStream: null,
    sysex_fader_personal: {
        category: 0x07,
        address: 0x16
    },
    sysex_enable_personal: {
        category: 0x07,
        address: 0x36
    },
    sysex_fader_stream: {
        category: 0x07,
        address: 0x06
    },
    sysex_enable_stream: {
        category: 0x07,
        address: 0x26
    },
}
musicChannel = {
    name: "Music",
    control_channel: 5,
    faderNodePersonal: null,
    faderNodeStream: null,
    muteButtonNodePersonal: null,
    muteButtonNodeStream: null,
    sysex_fader_personal: {
        category: 0x07,
        address: 0x18
    },
    sysex_enable_personal: {
        category: 0x07,
        address: 0x38
    },
    sysex_fader_stream: {
        category: 0x07,
        address: 0x08
    },
    sysex_enable_stream: {
        category: 0x07,
        address: 0x28
    },
}
systemChannel = {
    name: "System",
    control_channel: 6,
    faderNodePersonal: null,
    faderNodeStream: null,
    muteButtonNodePersonal: null,
    muteButtonNodeStream: null,
    sysex_fader_personal: {
        category: 0x07,
        address: 0x1A
    },
    sysex_enable_personal: {
        category: 0x07,
        address: 0x3A
    },
    sysex_fader_stream: {
        category: 0x07,
        address: 0x0A
    },
    sysex_enable_stream: {
        category: 0x07,
        address: 0x2A
    },
}
sfxChannel = {
    name: "SFX",
    control_channel: 7,
    faderNodePersonal: null,
    faderNodeStream: null,
    muteButtonNodePersonal: null,
    muteButtonNodeStream: null,
    sysex_fader_personal: {
        category: 0x07,
        address: 0xFF
    },
    sysex_enable_personal: {
        category: 0x07,
        address: 0xFF
    },
    sysex_fader_stream: {
        category: 0x07,
        address: 0xFF
    },
    sysex_enable_stream: {
        category: 0x07,
        address: 0xFF
    },
}
hdmiChannel = {
    name: "HDMI",
    control_channel: 8,
    faderNodePersonal: null,
    faderNodeStream: null,
    muteButtonNodePersonal: null,
    muteButtonNodeStream: null,
    sysex_fader_personal: {
        category: 0x07,
        address: 0x1E
    },
    sysex_enable_personal: {
        category: 0x07,
        address: 0x3E
    },
    sysex_fader_stream: {
        category: 0x07,
        address: 0x0E
    },
    sysex_enable_stream: {
        category: 0x07,
        address: 0x2E
    },
}
usbChannel = {
    name: "USB",
    control_channel: 9,
    faderNodePersonal: null,
    faderNodeStream: null,
    muteButtonNodePersonal: null,
    muteButtonNodeStream: null,
    sysex_fader_personal: {
        category: 0x08,
        address: 0x52
    },
    sysex_enable_personal: {
        category: 0x08,
        address: 0x56
    },
    sysex_fader_stream: {
        category: 0x08,
        address: 0x50
    },
    sysex_enable_stream: {
        category: 0x08,
        address: 0x54
    },
}



subMixOutput =  {
    name: "Sub-Mix",
    control_channel: null,
    enable: (b) => {enableSubMix(b)},
    setLevel: (l) => {setSubmixLevel(l)},
    sysex_enabled: {
        category: 0x07,
        address: 0x62
    },
    sysex_fader: {
        category: 0x07,
        address: 0x52
    }
}
streamOutput = {
    name: "Stream",
    control_channel: 14,
    sysex_enabled: {
        category: 0x07,
        address: 0x60
    },
    sysex_fader: {
        category: 0x07,
        address: 0x50
    }
}
lineOutput = {
    name: "Line",
    control_channel: 15,
    sysex_enabled: {
        category: 0x07,
        address: 0x68
    },
    sysex_fader: {
        category: 0x07,
        address: 0x58
    }
}
headphonesOutput = {
    name: "Headphones",
    control_channel: 16,
    sysex_enabled: {
        category: 0x07,
        address: 0x66
    },
    sysex_fader: {
        category: 0x07,
        address: 0x56
    }
}
