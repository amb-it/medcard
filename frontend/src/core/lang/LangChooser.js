import React, {useContext} from 'react';

import {Context} from "./Localizer";

function LangChooser(props) {
    const context = useContext(Context);

    return (
            <select className="custom-select" placeholder="lang" value = {context.locale} onChange={context.selectLanguage}>
                <option value='en'>eng</option>
                <option value='uk'>укр</option>
            </select>
    );
}

export default LangChooser;
