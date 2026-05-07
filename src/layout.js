
function initUI() {
    createInput(micChannel);
    createInput(auxChannel);
    createInput(chatChannel);
    createInput(gameChannel);
    createInput(musicChannel);
    createInput(systemChannel);
    createInput(sfxChannel);
    createInput(hdmiChannel);
    createInput(usbChannel);

    createOutput(subMixOutput);
    createOutput(streamOutput);
    createOutput(lineOutput);
    createOutput(headphonesOutput);
}

sysExFader = [];
sysExLabel = [];
sysExToggle = [];

function addFader(category, address, fader) {
    if (!sysExFader[category]) sysExFader[category] = {};
    sysExFader[category][address] = fader;
}
function addLabel(category, address, label) {
    if (!sysExLabel[category]) sysExLabel[category] = {};
    sysExLabel[category][address] = label;
}
function addToggle(category, address, toggle) {
    if (!sysExToggle[category]) sysExToggle[category] = {};
    sysExToggle[category][address] = toggle;
}

function updateInputChannelValues(inputItem, vol, volStream, volPersonal, enabled, enabledStream, enabledPersonal) {
    try {

        if(inputItem.mic_input_fader != null) {
            if(vol != null) {
                let fader = document.getElementById(inputItem.name+"-fader");
                fader.value = vol;
                let label = document.getElementById(inputItem.name+"-label");
                label.innerText = vol;
            }
            if(enabled != null) {
                let toggle = document.getElementById(inputItem.name+"-enabled");
                toggle.checked = enabled;
            }
        }
        if(inputItem.sysex_fader_personal != null) {
            let fader = document.getElementById(inputItem.name+"-personal-fader");
            fader.value = volPersonal;
            let label = document.getElementById(inputItem.name+"-personal-label");
            label.innerText = volPersonal;
            let toggle = document.getElementById(inputItem.name+"-personal-enabled");
            toggle.checked = enabledPersonal;
        }
        if(inputItem.sysex_fader_stream != null) {
            let fader = document.getElementById(inputItem.name+"-stream-fader");
            fader.value = volStream;
            let label = document.getElementById(inputItem.name+"-stream-label");
            label.innerText = volStream;
            let toggle = document.getElementById(inputItem.name+"-stream-enabled");
            toggle.checked = enabledStream;
        }
    } catch (error) {
        console.log(error);
    }

}

function updateOutputChannelValues(outputItem, vol, enabled) {
    if(outputItem.sysex_fader) {
        let fader = document.getElementById(outputItem.name+"-fader");
        fader.value = vol;
        let label = document.getElementById(outputItem.name+"-label");
        label.innerText = vol;
        let toggle = document.getElementById(outputItem.name+"-enabled");
        toggle.checked = enabled;
    }
}

function createInput(inputItem) {
    //Add Div
    const outerContainer = document.createElement("div");
    outerContainer.className = "channel";
    const container = document.createElement("div");
    container.className = "channel-controls";
    const titleNode = document.createElement("h3");
    titleNode.innerText = inputItem.name;
    outerContainer.appendChild(titleNode);
    outerContainer.appendChild(container);

    let inputsContainer = document.getElementById("inputs");
    inputsContainer.appendChild(outerContainer);


    //Only for mic inputItem
    if(inputItem.mic_input_fader) {
        const valueLabel = document.createElement("div");
        valueLabel.id = inputItem.name+"-label"
        valueLabel.className = "value";
        valueLabel.innerText = "0";
        addLabel(inputItem.mic_input_fader.category, inputItem.mic_input_fader.address, valueLabel)

        const slider = document.createElement("input");
        slider.id = inputItem.name+"-fader"
        slider.type = "range";
        slider.min = 0;
        slider.max = 127;
        slider.value = 0;
        slider.className = "slider";
        addFader(inputItem.mic_input_fader.category, inputItem.mic_input_fader.address, slider)
        slider.addEventListener("input", () => {
            const val = parseInt(slider.value);
            if (!isUpdatingFromMIDI) {
                valueLabel.innerText = slider.value;
                sendCC(inputItem.control_channel, 24, parseInt(slider.value));
            }
        });


        const mixContainer = document.createElement("div");
        mixContainer.className = "channel-mix";


        const checkbox = document.createElement("input");
        checkbox.id = inputItem.name+"-enabled"
        checkbox.type = "checkbox";
        checkbox.checked = true;
        addToggle(inputItem.mic_input_enabled.category, inputItem.mic_input_enabled.address, checkbox)
        checkbox.addEventListener("input", () => {
            if (!isUpdatingFromMIDI) {
                setEnabled(inputItem, "mic", checkbox.checked);
            }
        });

        const label = document.createElement("div");
        label.className = "label";
        label.innerText = inputItem.name;
        label.addEventListener("dblclick", (event) => {
            valueLabel.innerText = "100";
            slider.value = "100";
            sendCC(inputItem.control_channel, 24, parseInt(slider.value));
        })
        
        mixContainer.appendChild(label);
        mixContainer.appendChild(slider);
        mixContainer.appendChild(valueLabel);
        mixContainer.appendChild(checkbox);

        container.appendChild(mixContainer);
    }

    if(inputItem.sysex_fader_personal) {
        const valueLabel = document.createElement("div");
        valueLabel.id = inputItem.name+"-personal-label"
        valueLabel.className = "value";
        valueLabel.innerText = "0";
        addLabel(inputItem.sysex_fader_personal.category, inputItem.sysex_fader_personal.address, valueLabel)

        const slider = document.createElement("input");
        slider.id = inputItem.name+"-personal-fader"
        slider.type = "range";
        slider.min = 0;
        slider.max = 127;
        slider.value = 0;
        slider.className = "slider";
        addFader(inputItem.sysex_fader_personal.category, inputItem.sysex_fader_personal.address, slider)
        slider.addEventListener("input", () => {
            const val = parseInt(slider.value);
            if (!isUpdatingFromMIDI) {
                valueLabel.innerText = slider.value;
                sendCC(inputItem.control_channel, 23, parseInt(slider.value));
            }
        });

        const mixContainer = document.createElement("div");
        mixContainer.className = "channel-mix";


        const checkbox = document.createElement("input");
        checkbox.id = inputItem.name+"-personal-enabled"
        checkbox.type = "checkbox";
        checkbox.checked = true;
        addToggle(inputItem.sysex_enable_personal.category, inputItem.sysex_enable_personal.address, checkbox)
        checkbox.addEventListener("input", () => {
            setEnabled(inputItem, "personal", checkbox.checked);
        });


        const label = document.createElement("div");
        label.className = "label";
        label.innerText = "Personal";
        label.addEventListener("dblclick", (event) => {
            valueLabel.innerText = "100";
            slider.value = "100";
            sendCC(inputItem.control_channel, 23, parseInt(slider.value));
        })

        mixContainer.appendChild(label);
        mixContainer.appendChild(slider);
        mixContainer.appendChild(valueLabel);
        mixContainer.appendChild(checkbox);

        container.appendChild(mixContainer);
    }

    if(inputItem.sysex_fader_stream) {

        const valueLabel = document.createElement("div");
        valueLabel.id = inputItem.name+"-stream-label"
        valueLabel.className = "value";
        valueLabel.innerText = "0";
        addLabel(inputItem.sysex_fader_stream.category, inputItem.sysex_fader_stream.address, valueLabel)

        const slider = document.createElement("input");
        slider.id = inputItem.name+"-stream-fader"
        slider.type = "range";
        slider.min = 0;
        slider.max = 127;
        slider.value = 0;
        slider.className = "slider";
        addFader(inputItem.sysex_fader_stream.category, inputItem.sysex_fader_stream.address, slider)
        slider.addEventListener("input", () => {
            const val = parseInt(slider.value);
            if (!isUpdatingFromMIDI) {
                valueLabel.innerText = slider.value;
                sendCC(inputItem.control_channel, 22, parseInt(slider.value));
            }
        });

        const mixContainer = document.createElement("div");
        mixContainer.className = "channel-mix";


        const checkbox = document.createElement("input");
        checkbox.id = inputItem.name+"-stream-enabled"
        checkbox.type = "checkbox";
        checkbox.checked = true;
        addToggle(inputItem.sysex_enable_stream.category, inputItem.sysex_enable_stream.address, checkbox)
        checkbox.addEventListener("input", () => {
            setEnabled(inputItem, "stream", checkbox.checked);
        });

        const label = document.createElement("div");
        label.className = "label";
        label.innerText = "Stream";
        label.addEventListener("dblclick", (event) => {
            valueLabel.innerText = "100";
            slider.value = "100";
            sendCC(inputItem.control_channel, 22, parseInt(slider.value));
        })
        
        mixContainer.appendChild(label);
        mixContainer.appendChild(slider);
        mixContainer.appendChild(valueLabel);
        mixContainer.appendChild(checkbox);

        container.appendChild(mixContainer);
    }
}

function createOutput(outputItem) {
    //Add Div
    const outerContainer = document.createElement("div");
    outerContainer.className = "channel";
    const container = document.createElement("div");
    container.className = "channel-controls";
    const titleNode = document.createElement("h3");
    titleNode.innerText = outputItem.name;
    outerContainer.appendChild(titleNode);
    outerContainer.appendChild(container);

    let inputsContainer = document.getElementById("outputs");
    inputsContainer.appendChild(outerContainer);


    //Only for mic outputItem
    if(outputItem.sysex_fader) {
        const valueLabel = document.createElement("div");
        valueLabel.id = outputItem.name+"-label"
        valueLabel.className = "value";
        valueLabel.innerText = "0";
        addLabel(outputItem.sysex_fader.category, outputItem.sysex_fader.address, valueLabel)

        const slider = document.createElement("input");
        slider.id = outputItem.name+"-fader"
        slider.type = "range";
        slider.min = 0;
        slider.max = 127;
        slider.value = 0;
        slider.className = "slider";
        addFader(outputItem.sysex_fader.category, outputItem.sysex_fader.address, slider)
        if (outputItem.enable != null) {
            slider.addEventListener("input", () => {
                valueLabel.innerText = slider.value;
                outputItem.setLevel(parseInt(slider.value));
            });
        } else {
            slider.disabled = "disabled";
        }

        const mixContainer = document.createElement("div");
        mixContainer.className = "channel-mix";


        const checkbox = document.createElement("input");
        checkbox.id = outputItem.name+"-enabled"
        checkbox.type = "checkbox";
        checkbox.checked = true;
        addToggle(outputItem.sysex_enabled.category, outputItem.sysex_enabled.address, checkbox)
        if(outputItem.control_channel) {
            checkbox.addEventListener("input", () => {
                setEnabled(outputItem, "output", checkbox.checked);
            });
        } else if (outputItem.enable != null) {
            checkbox.addEventListener("input", () => outputItem.enable(checkbox.checked));
        } else {
            checkbox.disabled = "disabled";
        }

        const label = document.createElement("div");
        label.className = "label";
        label.innerText = outputItem.name;
        if (outputItem.enable != null) {
            label.addEventListener("dblclick", (event) => {
                valueLabel.innerText = "100";
                slider.value = "100";
                outputItem.setLevel(parseInt(slider.value));
            })
        }
        mixContainer.appendChild(label);
        mixContainer.appendChild(slider);
        mixContainer.appendChild(valueLabel);
        mixContainer.appendChild(checkbox);

        container.appendChild(mixContainer);
    }
}