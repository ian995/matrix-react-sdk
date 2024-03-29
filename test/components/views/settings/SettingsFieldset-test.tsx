/*
Copyright 2021 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';

import SettingsFieldset from '../../../../src/components/views/settings/SettingsFieldset';

describe('<SettingsFieldset />', () => {
    const defaultProps = {
        "legend": 'Who can read history?',
        "children": <div>test</div>,
        'data-test-id': 'test',
    };
    const getComponent = (props = {}) => {
        const wrapper = renderIntoDocument<HTMLDivElement>(
            <div><SettingsFieldset {...defaultProps} {...props} /></div>,
        ) as HTMLDivElement;
        return wrapper.children[0];
    };

    it('renders fieldset without description', () => {
        expect(getComponent()).toMatchSnapshot();
    });

    it('renders fieldset with plain text description', () => {
        const description = 'Changes to who can read history.';
        expect(getComponent({ description })).toMatchSnapshot();
    });

    it('renders fieldset with react description', () => {
        const description = <><p>Test</p><a href='#'>a link</a></>;
        expect(getComponent({ description })).toMatchSnapshot();
    });
});
